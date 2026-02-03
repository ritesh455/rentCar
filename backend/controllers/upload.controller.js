const { encryptBuffer } = require("../utils/crypto.util");
const { saveFile } = require("../utils/storage.util");

function generatePath(prefix) {
  return `${prefix}/${Date.now()}-${Math.random().toString(36).slice(2)}.enc`;
}

exports.uploadAadhaar = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  const encrypted = encryptBuffer(req.file.buffer);
  const storagePath = generatePath("owners/aadhaar");

  saveFile(storagePath, encrypted);

  res.status(200).json({ storagePath });
};

exports.uploadRC = async (req, res) => {
  const encrypted = encryptBuffer(req.file.buffer);
  const storagePath = generatePath("vehicles/rc");

  saveFile(storagePath, encrypted);

  res.status(200).json({ storagePath });
};

exports.uploadNOC = async (req, res) => {
  const encrypted = encryptBuffer(req.file.buffer);
  const storagePath = generatePath("vehicles/noc");

  saveFile(storagePath, encrypted);

  res.status(200).json({ storagePath });
};
