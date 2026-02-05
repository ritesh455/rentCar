const db = require("../../config/firebase");
const { generateOtp, hashOtp, compareOtp } = require("../../utils/otp.util");
const { hashPassword, comparePassword } = require("../../utils/password.util");
const validator = require("./owner.validation");
const { generateToken } = require("../../utils/jwt.util");
const { encrypt } = require("../../utils/crypto.util");
const storageUtil = require("../../utils/storage.util"); 
const OTP_EXPIRY_MIN = 5;

// REGISTER → SEND OTP
exports.register = async (data) => {
  validator.validateRegister(data);
console.log(`>>> [SERVICE] Processing registration for: ${data.email}`);
  const { name,  email,  phone,  password,  dob,  address,  aadhaarStoragePath } = data;

  // check existing owner
  const emailQuery = db.collection("owners").where("email", "==", email).limit(1).get();
  const phoneQuery = db.collection("owners").where("phone", "==", phone).limit(1).get();
  const [emailSnap, phoneSnap] = await Promise.all([emailQuery, phoneQuery]);

  if (!emailSnap.empty) {
    throw { status: 409, message: "Email already registered" };
  }
  if (!phoneSnap.empty) {
    throw { status: 409, message: "Phone number already registered" };
  }

  const otp = generateOtp();
  const otpHash = await hashOtp(otp);
  const passwordHash = await hashPassword(password);

  const expiresAt = new Date(); 
  expiresAt.setMinutes(expiresAt.getMinutes() + OTP_EXPIRY_MIN);

  await db.collection("otp_requests").doc(email).set({
    identifier: email,
    accountType: "OWNER" ,
    otpHash,
    expiresAt,
    attemptsLeft: 3,
    tempUserData: {
      name,
      email,
      phone: phone ,
      passwordHash,
      dob: dob ,
      addressEncrypted: encrypt(address),
      aadhaar: {
        storagePath: aadhaarStoragePath,
        isVerified: false
      },
    },
    createdAt: new Date()
  });

  // TEMP: log OTP (replace with email/SMS later)
  console.log("OTP for", email, ":", otp);

  return { message: "OTP sent successfully" };
};

// VERIFY OTP → CREATE OWNER
exports.verifyOtp = async ({ email, otp }) => {
  validator.validateOtp({ email, otp });

  const ref = db.collection("otp_requests").doc(email);
  const snap = await ref.get();

  if (!snap.exists) {
    throw { status: 400, message: "OTP expired or not found" };
  }

  const data = snap.data();

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
  const tempPath = data.tempUserData.aadhaar.storagePath; // This is just the filename
console.log("from"+tempPath);
  const permanentPath = await storageUtil.promoteFile(tempPath, 'owners/aadhaar');
    console.log(" to "+permanentPath);
  await db.collection("owners").add({
    ...data.tempUserData,
    aadhaar: { storagePath: permanentPath, isVerified: false },
    isVerified: true,
    createdAt: new Date()
  });

  await ref.delete();

  return { message: "Registration successful" };
};

// LOGIN

exports.login = async ({ email, password }) => {
  validator.validateLogin({ email, password });

  const snap = await db
    .collection("owners")
    .where("email", "==", email)
    .limit(1)
    .get();

  if (snap.empty) {
    throw { status: 401, message: "Invalid credentials" };
  }

  const doc = snap.docs[0];
  const owner = doc.data();

  const valid = await comparePassword(password, owner.passwordHash);
  if (!valid) {
    throw { status: 401, message: "Invalid credentials" };
  }

  // 🔑 JWT payload
  const token = generateToken({
    ownerId: doc.id,
    email: owner.email,
    role: "OWNER"
  });

  return {
    message: "Login successful",
    token,
    owner: {
      id: doc.id,
      email: owner.email,
      name: owner.name
    }
  };
};

