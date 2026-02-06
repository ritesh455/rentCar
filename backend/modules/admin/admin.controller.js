const service = require("./admin.service");
const { decryptBuffer } = require("../../utils/crypto.util");

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const result = await service.login(email, password);

    res.status(200).json(result);
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message });
  }
};

exports.createAdmin = async (req, res) => {
  try {
    const result = await service.createAdmin(req.body, req.admin);
    res.status(201).json(result);
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message });
  }
};


//verfication controllers
exports.getPendingVehicles = async (req, res) => {
  try {
    const result = await service.getPendingVehicles();
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.verifyRC = async (req, res) => {
  try {
    const result = await service.verifyRC(req.params.id, req.admin);
    res.status(200).json(result);
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message });
  }
};

exports.verifyNOC = async (req, res) => {
  try {
    const result = await service.verifyNOC(req.params.id, req.admin);
    res.status(200).json(result);
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message });
  }
};

exports.verifyVehicle = async (req, res) => {
  try {
    const result = await service.verifyVehicle(req.params.id, req.admin);
    res.status(200).json(result);
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message });
  }
};

exports.activateVehicle = async (req, res) => {
  try {
    const result = await service.activateVehicle(req.params.id, req.admin);
    res.status(200).json(result);
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message });
  }
};

exports.verifyImages = async (req, res) => {
  try {
    const result = await service.verifyImages(req.params.id, req.admin);
    res.status(200).json(result);
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message });
  }
};



//viweing the files
exports.viewRC = async (req, res) => {
  try {
    const buffer = await service.getRCBuffer(req.params.id);
    res.setHeader("Content-Type", "image/jpeg");
    res.send(buffer);
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message });
  }
};

exports.viewNOC = async (req, res) => {
  try {
    const buffer = await service.getNOCBuffer(req.params.id);
    res.setHeader("Content-Type", "image/jpeg");
    res.send(buffer);
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message });
  }
};

exports.viewAadhaar = async (req, res) => {
  try {
    const buffer = await service.getAadhaarBuffer(req.params.ownerId);
    res.setHeader("Content-Type", "image/jpeg");
    res.send(buffer);
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message });
  }
};

exports.getVehicleImages = async (req, res) => {
  try {
    const result = await service.getVehicleImages(req.params.id);
    res.status(200).json(result);
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message });
  }
};
