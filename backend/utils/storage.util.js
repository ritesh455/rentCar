const fs = require("fs");
const path = require("path");

/**
 * Save encrypted file to local storage (TEMP)
 * @param {string} relativePath - e.g. owners/aadhaar/123.enc
 * @param {Buffer} buffer - encrypted file buffer
 */
exports.saveFile = (relativePath, buffer) => {
  const baseDir = path.join(__dirname, "..", "storage");
  const fullPath = path.join(baseDir, relativePath);

  fs.mkdirSync(path.dirname(fullPath), { recursive: true });
  fs.writeFileSync(fullPath, buffer);
};

/**
 * Read encrypted file from local storage (ADMIN ONLY)
 * @param {string} relativePath
 */
exports.readFile = (relativePath) => {
  const baseDir = path.join(__dirname, "..", "storage");
  const fullPath = path.join(baseDir, relativePath);

  if (!fs.existsSync(fullPath)) {
    throw new Error("File not found");
  }

  return fs.readFileSync(fullPath);
};
