const ownerService = require("./owner.service");
const COOKIE_OPTIONS = require("../../config/cookieOptions");
const jwtUtil = require("../../utils/jwt.util");
const { encryptBuffer } = require("../../utils/crypto.util");
const { saveToGlobalTemp } = require("../../utils/storage.util");

exports.register = async (req, res) => {
  try {
    if (!req.file) throw { status: 400, message: "Aadhaar image required" };
    const filename = `${Date.now()}.enc`;
    const encrypted = encryptBuffer(req.file.buffer);
    await saveToGlobalTemp(filename, encrypted);

    // 2. Pass data to the Service
    const result = await ownerService.register({
      ...req.body,
      aadhaarStoragePath: filename
    });

    res.status(200).json(result);
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message });
  }
};

exports.verifyOtp = async (req, res) => {
  try {
    const result = await ownerService.verifyOtp(req.body);
    res.status(201).json(result);
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message });
  }
};

// exports.login = async (req, res) => {
//   try {
//     const result = await ownerService.login(req.body);
//     res.status(200).json(result);
//   } catch (err) {
//     res.status(err.status || 500).json({ message: err.message });
//   }
// };

exports.login = async (req, res) => {
  try {
    const result = await ownerService.login(req.body);

    res.cookie("token", result.token, COOKIE_OPTIONS);

    res.status(200).json({
      message: "Login successful",
      user: result.user
    });
  } catch (err) {
    res.status(err.status || 500).json({  message: err.message || "Server error" });
  }
};

