const db = require("../../config/firebase");
const { buildImageUrls } = require("../../utils/image.util");
const validator = require("./vehicle.validation");
const fs = require("fs");
const path = require("path");
const S_S_D = process.env.S_S_D;

exports.addVehicle = async (data, owner) => {
  validator.validateCreateVehicle(data);

  const { type, brand, model, vehicleNumber, pricePerDay, fuelType, seats, rcStoragePath, nocStoragePath } = data;

  // prevent duplicate vehicle number
  const existing = await db
    .collection("vehicles")
    .where("vehicleNumber", "==", vehicleNumber)
    .limit(1)
    .get();

  if (!existing.empty) {
    throw { status: 409, message: "Vehicle already registered" };
  }

  await db.collection("vehicles").add({
    type,
    brand,
    model,
    vehicleNumber,
    pricePerDay,
    fuelType,
    seats,
    documents:{
      rc: {
      storagePath: rcStoragePath,
      isVerified: false
    },
    noc: {
      storagePath: nocStoragePath,
      isVerified: false
    }
    },
    ownerId: owner.ownerId,
    ownerEmail: owner.email,
    ownerloc: owner.address,
    imageCount: 0,
    isImagesUploaded: false,
    isImagesVerified: false,
    isActive: false,
    isVerifiedByAdmin: false,
    createdAt: new Date()
  });

  return { message: "Vehicle added successfully" };
};  
exports.getMyVehicles = async (owner) => {
  const snap = await db
    .collection("vehicles")
    .where("ownerId", "==", owner.ownerId)
    .get();

  const vehicles = snap.docs.map(doc => {
    const data = doc.data(); // ✅ FIX

    return {
      id: doc.id,
      ...data,
      images: data.isImagesUploaded
        ? buildImageUrls(doc.id, data.imageCount, 1)
        : []
    };
  });

  return { vehicles };
};





//public
exports.getPublicVehicles = async () => {
  const snap = await db
    .collection("vehicles")
    .where("isActive", "==", true)
    .get();

  const vehicles = snap.docs.map(doc => {
    const data = doc.data();

    return {
      id: doc.id,
      type: data.type,
      brand: data.brand,
      model: data.model,
      fuelType:data.fuelType,
      pricePerDay: data.pricePerDay,
      seats:data.seats,
      ownerloc:data.ownerloc,
      images: data.isImagesUploaded? buildImageUrls(doc.id, data.imageCount, 1): []
    };
  });

  return { vehicles };
};

exports.getPublicVehicleById = async (vehicleId) => {
  const docRef = await db.collection("vehicles").doc(vehicleId).get();

  if (!docRef.exists) {
    throw { status: 404, message: "Vehicle not found" };
  }
  
  const data = docRef.data();
  
  if (!data.isActive) {
    throw { status: 404, message: "Vehicle not available" };
  }
  return {
    id: docRef.id,
    type: data.type,
    brand: data.brand,
    model: data.model,
    fuelType:data.fuelType,
    pricePerDay: data.pricePerDay,
    seats:data.seats,
    ownerloc:data.ownerloc,
    vehicleNumber:data.vehicleNumber,
    images: data.isImagesUploaded
      ? buildImageUrls(docRef.id, data.imageCount)
      : []
  };
};


//Update api

exports.uploadVehicleImages = async (vehicleId, owner, files) => {
  const ref = db.collection("vehicles").doc(vehicleId);
  const snap = await ref.get();

  if (!snap.exists) {
    throw { status: 404, message: "Vehicle not found" };
  }

  const vehicle = snap.data();

  // ownership check
  if (vehicle.ownerId !== owner.ownerId) {
    throw { status: 403, message: "Not allowed to upload images" };
  }

  // clear old images
  const imageDir = path.join(
    S_S_D,
    "vehicles",
    vehicleId,
    "images"
  );

  if (fs.existsSync(imageDir)) {
    fs.rmSync(imageDir, { recursive: true, force: true });
  }

  fs.mkdirSync(imageDir, { recursive: true });

  // save new images
  for (let i = 0; i < files.length; i++) {
    const filePath = path.join(imageDir, `${i + 1}.jpg`);
    fs.writeFileSync(filePath, files[i].buffer);
  }

  // update firestore
  await ref.update({
    imageCount: files.length,
    isImagesUploaded: true,
    updatedAt: new Date()
  });

  return {
    message: "Vehicle images uploaded successfully",
    imageCount: files.length
  };
};

exports.updateVehicle = async (vehicleId, data, owner) => {
  validator.validateUpdateVehicle(data);

  const ref = db.collection("vehicles").doc(vehicleId);
  const snap = await ref.get();

  if (!snap.exists) {
    throw { status: 404, message: "Vehicle not found" };
  }

  const vehicle = snap.data();

  // ownership check
  if (vehicle.ownerId !== owner.ownerId) {
    throw { status: 403, message: "Not allowed to update this vehicle" };
  }

  await ref.update({
    ...data,
    isActive:false,
    updatedAt: new Date()
  });

  return { message: "Vehicle updated successfully" };
};

exports.updateVehicleStatus = async (vehicleId, isActive, owner) => {
  if (typeof isActive !== "boolean") {
    throw { status: 400, message: "isActive must be true or false" };
  }

  const ref = db.collection("vehicles").doc(vehicleId);
  const snap = await ref.get();

  if (!snap.exists) {
    throw { status: 404, message: "Vehicle not found" };
  }

  const vehicle = snap.data();

  // ownership check
  if (vehicle.ownerId !== owner.ownerId) {
    throw { status: 403, message: "Not allowed to change vehicle status" };
  }

  // 🔴 IMPORTANT BUSINESS RULE
  if (isActive === true) {
    if (
      !vehicle.isVerifiedByAdmin ||
      !vehicle.documents?.rc?.isVerified ||
      !vehicle.documents?.noc?.isVerified ||
      !vehicle.isImagesUploaded
    ) {
      throw {
        status: 400,
        message:
          "Vehicle cannot be activated until admin, RC, NOC verification and images upload are completed"
      };
    }
  }

  await ref.update({
    isActive,
    updatedAt: new Date()
  });

  return {
    message: `Vehicle ${isActive ? "activated" : "deactivated"} successfully`
  };
};
