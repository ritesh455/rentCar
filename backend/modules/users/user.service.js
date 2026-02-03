const db = require("../../config/firebase");
const validator = require("./user.validation");
const { generateOtp, hashOtp, compareOtp } = require("../../utils/otp.util");
const { hashPassword, comparePassword } = require("../../utils/password.util");
const { generateToken } = require("../../utils/jwt.util");

const OTP_EXPIRY_MIN = 5;

// 1️⃣ REGISTER USER → SEND OTP
exports.register = async (data) => {
  validator.validateRegister(data);

  const { name, email, phone, password } = data;

  // check existing user
  const snap = await db
    .collection("users")
    .where("email", "==", email)
    .limit(1)
    .get();

  if (!snap.empty) {
    throw { status: 409, message: "User already registered" };
  }

  const otp = generateOtp();
  const otpHash = await hashOtp(otp);
  const passwordHash = await hashPassword(password);

  const expiresAt = new Date();
  expiresAt.setMinutes(expiresAt.getMinutes() + OTP_EXPIRY_MIN);

  await db.collection("otp_requests").doc(email).set({
    identifier: email,
    accountType: "USER",
    otpHash,
    expiresAt,
    attemptsLeft: 3,
    tempUserData: {
      name,
      email,
      phone: phone || null,
      passwordHash
    },
    createdAt: new Date()
  });

  // DEV ONLY
  console.log(`USER OTP for ${email}:`, otp);

  return { message: "OTP sent successfully" };
};

// 2️⃣ VERIFY OTP → CREATE USER
exports.verifyOtp = async ({ email, otp }) => {
  validator.validateVerifyOtp({ email, otp });

  const ref = db.collection("otp_requests").doc(email);
  const snap = await ref.get();

  if (!snap.exists) {
    throw { status: 400, message: "OTP expired or not found" };
  }

  const data = snap.data();

  if (data.accountType !== "USER") {
    throw { status: 400, message: "Invalid OTP request type" };
  }

  if (data.expiresAt.toDate() < new Date()) {
    await ref.delete();
    throw { status: 400, message: "OTP expired" };
  }

  if (data.attemptsLeft <= 0) {
    await ref.delete();
    throw { status: 400, message: "Too many attempts" };
  }

  const valid = await compareOtp(otp, data.otpHash);

  if (!valid) {
    await ref.update({ attemptsLeft: data.attemptsLeft - 1 });
    throw { status: 400, message: "Invalid OTP" };
  }

  await db.collection("users").add({
    ...data.tempUserData,
    isVerified: true,
    createdAt: new Date()
  });

  await ref.delete();

  return { message: "User registered successfully" };
};

// 3️⃣ USER LOGIN
exports.login = async ({ email, password }) => {
  validator.validateLogin({ email, password });

  const snap = await db
    .collection("users")
    .where("email", "==", email)
    .limit(1)
    .get();

  if (snap.empty) {
    throw { status: 401, message: "Invalid credentials" };
  }

  const doc = snap.docs[0];
  const user = doc.data();

  const valid = await comparePassword(password, user.passwordHash);
  if (!valid) {
    throw { status: 401, message: "Invalid credentials" };
  }

  const token = generateToken({
    userId: doc.id,
    email: user.email,
    role: "USER"
  });

  return {
    message: "Login successful",
    token,
    user: {
      id: doc.id,
      name: user.name,
      email: user.email
    }
  };
};
