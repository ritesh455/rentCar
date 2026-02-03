const userService = require("./user.service");
const COOKIE_OPTIONS = require("../../config/cookieOptions");

exports.register = async (req, res) => {
  try {
    const result = await userService.register(req.body);
    res.status(200).json(result);
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message });
  }
};

exports.verifyOtp = async (req, res) => {
  try {
    const result = await userService.verifyOtp(req.body);
    res.status(201).json(result);
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message });
  }
};

// exports.login = async (req, res) => {
//   try {
//     const result = await userService.login(req.body);
//     res.status(200).json(result);
//   } catch (err) {
//     res.status(err.status || 500).json({ message: err.message });
//   }
// };

exports.login = async (req, res) => {
  try {
    const result = await userService.login(req.body);

    res.cookie("token", result.token, COOKIE_OPTIONS);

    res.status(200).json({
      message: "Login successful",
      user: result.user
    });
  } catch (err) {
    res.status(err.status || 500).json({
      message: err.message || "Server error"
    });
  }
};

exports.logout = (req, res) => {
  res.clearCookie("token", COOKIE_OPTIONS);

  res.status(200).json({ message: "Logged out successfully" });
};

