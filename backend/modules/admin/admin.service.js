const { buildImageUrls } = require("../../utils/image.util");
const fs = require("fs");
const path = require("path");
const db = require("../../config/firebase");
const { decryptBuffer } = require("../../utils/crypto.util");
const S_S_D = process.env.S_S_D;

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.login = async (email, password) => {
  const snap = await db
    .collection("admins")
    .where("email", "==", email)
    .limit(1)
    .get();

  if (snap.empty) {
    throw { status: 401, message: "Invalid credentials" };
  }

  const adminDoc = snap.docs[0];
  const admin = adminDoc.data();

  if (!admin.isActive) {
    throw { status: 403, message: "Admin account disabled" };
  }

  const match = await bcrypt.compare(password, admin.passwordHash);
  if (!match) {
    throw { status: 401, message: "Invalid credentials" };
  }

  const token = jwt.sign(
    {
      adminId: adminDoc.id,
      role: admin.role,
      name: admin.name
    },
    process.env.JWT_ADMIN_SECRET,
    { expiresIn: "8h" }
  );

  await adminDoc.ref.update({
    lastLoginAt: new Date()
  });

  return {
    token,
    admin: {
      id: adminDoc.id,
      email: admin.email,
      name: admin.name,
      role: admin.role
    }
  };
};


exports.createAdmin = async (data, creatorAdmin) => {
  const { email, name, password } = data;

  if (!email || !name || !password) {
    throw { status: 400, message: "Email, name and password are required" };
  }

  // Only root or admin can create admins
  if (!["root", "admin"].includes(creatorAdmin.role)) {
    throw { status: 403, message: "Not allowed to create admin" };
  }

  // Prevent duplicate admin email
  const existing = await db
    .collection("admins")
    .where("email", "==", email)
    .limit(1)
    .get();

  if (!existing.empty) {
    throw { status: 409, message: "Admin with this email already exists" };
  }

  const passwordHash = await bcrypt.hash(password, 10);

  await db.collection("admins").add({
    email,
    name,
    role: "admin",
    isActive: true,

    createdBy: creatorAdmin.adminId,
    createdByName: creatorAdmin.name || "Admin",

    passwordHash,
    createdAt: new Date()
  });

  return { message: "Admin created successfully" };
};

// verifications start
//1. get all pending veehicles
exports.getPendingVehicles = async () => {
  const snap = await db.collection("vehicles").get();

  const vehicles = snap.docs
    .map(doc => ({ id: doc.id, ...doc.data() }))
    .filter(v =>
      !v.isVerifiedByAdmin ||
      !v.documents?.rc?.isVerified ||
      !v.documents?.noc?.isVerified ||
      !v.isImagesUploaded
    );

  return { vehicles };
};

//verify RC
exports.verifyRC = async (vehicleId, admin) => {
  const ref = db.collection("vehicles").doc(vehicleId);
  const snap = await ref.get();

  if (!snap.exists) {
    throw { status: 404, message: "Vehicle not found" };
  }

  await ref.update({
    "documents.rc.isVerified": true,
    updatedAt: new Date()
  });

  return { message: "RC verified successfully" };
};


//verify NOC
exports.verifyNOC = async (vehicleId, admin) => {
  const ref = db.collection("vehicles").doc(vehicleId);
  const snap = await ref.get();

  if (!snap.exists) {
    throw { status: 404, message: "Vehicle not found" };
  }

  await ref.update({
    "documents.noc.isVerified": true,
    updatedAt: new Date()
  });

  return { message: "NOC verified successfully" };
};


//Verify Vehicle images
exports.verifyImages = async (vehicleId, admin) => {
  const ref = db.collection("vehicles").doc(vehicleId);
  const snap = await ref.get();

  if (!snap.exists) {
    throw { status: 404, message: "Vehicle not found" };
  }

  const vehicle = snap.data();

  if (!vehicle.isImagesUploaded) {
    throw {
      status: 400,
      message: "Images not uploaded by owner yet"
    };
  }

  await ref.update({
    isImagesVerified: true,
    imagesVerifiedByAdminId: admin.adminId,
    imagesVerifiedByAdminName: admin.name,
    updatedAt: new Date()
  });

  return { message: "Vehicle images verified successfully" };
};



//verify VEHICAL(FINAL ADMIN)
exports.activateVehicle = async (vehicleId, admin) => {
  const ref = db.collection("vehicles").doc(vehicleId);
  const snap = await ref.get();

  if (!snap.exists) {
    throw { status: 404, message: "Vehicle not found" };
  }

  const v = snap.data();

  if (
    !v.documents?.rc?.isVerified ||
    !v.documents?.noc?.isVerified ||
    !v.isImagesUploaded
  ) {
    throw {
      status: 400,
      message: "Vehicle does not meet activation requirements"
    };
  }

  await ref.update({
    isVerifiedByAdmin: true,
    approvedByAdminId: admin.adminId,
    approvedByAdminName: admin.name,
    approvedAt: new Date()
  });

  return { message: "Vehicle activated successfully" };
};



//view the RC(Decreption)
exports.getRCBuffer = async (vehicleId) => {
  const snap = await db.collection("vehicles").doc(vehicleId).get();

  if (!snap.exists) {
    throw { status: 404, message: "Vehicle not found" };
  }

  const rcPath = snap.data().documents?.rc?.storagePath;
  if (!rcPath) {
    throw { status: 404, message: "RC not found" };
  }

  const encrypted = fs.readFileSync(path.join(S_S_D, rcPath));
  return decryptBuffer(encrypted);
};


// view the NOC(Decreption)
exports.getNOCBuffer = async (vehicleId) => {
  const snap = await db.collection("vehicles").doc(vehicleId).get();

  if (!snap.exists) {
    throw { status: 404, message: "Vehicle not found" };
  }

  const nocPath = snap.data().documents?.noc?.storagePath;
  if (!nocPath) {
    throw { status: 404, message: "NOC not found" };
  }

  const encrypted = fs.readFileSync(path.join(S_S_D, nocPath));
  return decryptBuffer(encrypted);
};


// view the addhaar(Decreption)
exports.getAadhaarBuffer = async (ownerId) => {
  const snap = await db.collection("owners").doc(ownerId).get();

  if (!snap.exists) {
    throw { status: 404, message: "Owner not found" };
  }

  const aadhaarPath = snap.data().aadhaar?.storagePath;
  if (!aadhaarPath) {
    throw { status: 404, message: "Aadhaar not found" };
  }

  const encrypted = fs.readFileSync(path.join(S_S_D, aadhaarPath));
  return decryptBuffer(encrypted);
};


//view Images
exports.getVehicleImages = async (vehicleId) => {
  const snap = await db.collection("vehicles").doc(vehicleId).get();

  if (!snap.exists) {
    throw { status: 404, message: "Vehicle not found" };
  }

  const data = snap.data();

  if (!data.isImagesUploaded || data.imageCount === 0) {
    return { images: [] };
  }

  const images = buildImageUrls(vehicleId, data.imageCount);

  return { images };
};
