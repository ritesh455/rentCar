exports.validateCreateVehicle = (data) => {
  const { type, brand, model, vehicleNumber, pricePerDay } = data;

  if (!type || !brand || !model || !vehicleNumber || !pricePerDay) {
    throw { status: 400, message: "All vehicle fields are required" };
  }

  if (!["car", "bike"].includes(type)) {
    throw { status: 400, message: "Vehicle type must be car or bike" };
  }

  if (pricePerDay <= 0) {
    throw { status: 400, message: "Price must be greater than 0" };
  }
};

exports.validateUpdateVehicle = (data) => {
  const allowedFields = ["brand", "model", "pricePerDay"];

  const keys = Object.keys(data);

  if (keys.length === 0) {
    throw { status: 400, message: "No data provided to update" };
  }

  const invalid = keys.find(k => !allowedFields.includes(k));
  if (invalid) {
    throw { status: 400, message: `Field ${invalid} cannot be updated` };
  }

  if (data.pricePerDay && data.pricePerDay <= 0) {
    throw { status: 400, message: "Price must be greater than 0" };
  }
};

