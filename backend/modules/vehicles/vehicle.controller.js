const vehicleService = require("./vehicle.service");
const { encryptBuffer } = require("../../utils/crypto.util");
const { saveDirectly } = require("../../utils/storage.util");

exports.addVehicle = async (req, res) => {
  try {
    // 1. Check if both files are present
    if (!req.files || !req.files['rc'] || !req.files['noc']) {
      throw { status: 400, message: "Both RC and NOC images are required" };
    }

    // 2. Encrypt and save RC to global temp
    const rcFilename = `rc-${Date.now()}.enc`;
    const rcEncrypted = encryptBuffer(req.files['rc'][0].buffer);
const rcPath = await saveDirectly(rcFilename, rcEncrypted, 'vehicles/rc');

    // 3. Encrypt and save NOC to global temp
    const nocFilename = `noc-${Date.now()}.enc`;
    const nocEncrypted = encryptBuffer(req.files['noc'][0].buffer);
    const nocPath = await saveDirectly(nocFilename, nocEncrypted, 'vehicles/noc');

    // 4. Pass text data and storage paths to Service
    const result = await vehicleService.addVehicle({
      ...req.body,
      rcStoragePath: rcPath,
      nocStoragePath: nocPath
    }, req.user);

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
