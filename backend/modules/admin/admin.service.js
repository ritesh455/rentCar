const fs = require('fs');
const path = require('path');
const os = require('os');
const { decryptBuffer } = require("../../utils/crypto.util");

const PERSISTENT_DIR = path.join(os.homedir(), 'vehicle-rental-secure-storage');

exports.getFileForAdmin = async (relativePath) => {
  const fullPath = path.join(PERSISTENT_DIR, relativePath);

  if (!fs.existsSync(fullPath)) {
    throw { status: 404, message: "File not found on disk" };
  }

  const encryptedData = fs.readFileSync(fullPath);
  // Decrypt so the Admin can actually see the image
  return decryptBuffer(encryptedData);
};