const db = require("../../config/firebase");
const validator = require("./vehicle.validation");

exports.addVehicle = async (data, owner) => {
  validator.validateCreateVehicle(data);

  const { type, brand, model, vehicleNumber, pricePerDay } = data;

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

    ownerId: owner.ownerId,
    ownerEmail: owner.email,

    isActive: true,
    createdAt: new Date()
  });

  return { message: "Vehicle added successfully" };
};

exports.getMyVehicles = async (owner) => {
  const snap = await db
    .collection("vehicles")
    .where("ownerId", "==", owner.ownerId)
    .get();

  const vehicles = snap.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));

  return { vehicles };
};

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
      pricePerDay: data.pricePerDay
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
    pricePerDay: data.pricePerDay
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

  if (vehicle.ownerId !== owner.ownerId) {
    throw { status: 403, message: "Not allowed to change vehicle status" };
  }

  await ref.update({
    isActive,
    updatedAt: new Date()
  });

  return {
    message: `Vehicle ${isActive ? "activated" : "deactivated"} successfully`
  };
};
