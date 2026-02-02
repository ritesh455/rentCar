const vehicleService = require("./vehicle.service");

exports.addVehicle = async (req, res) => {
  try {
    const result = await vehicleService.addVehicle(req.body, req.user);
    res.status(201).json(result);
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message });
  }
};

exports.getMyVehicles = async (req, res) => {
  try {
    const result = await vehicleService.getMyVehicles(req.user);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.getPublicVehicles = async (req, res) => {
  try {
    const result = await vehicleService.getPublicVehicles();
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.getPublicVehicleById = async (req, res) => {
  try {
    const result = await vehicleService.getPublicVehicleById(req.params.id);
    res.status(200).json(result);
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message });
  }
};

exports.updateVehicle = async (req, res) => {
  try {
    const result = await vehicleService.updateVehicle(
      req.params.id,
      req.body,
      req.user
    );
    res.status(200).json(result);
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message });
  }
};

exports.updateVehicleStatus = async (req, res) => {
  try {
    const { isActive } = req.body;

    const result = await vehicleService.updateVehicleStatus(
      req.params.id,
      isActive,
      req.user
    );

    res.status(200).json(result);
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message });
  }
};
