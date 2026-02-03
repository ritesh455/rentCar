const COOKIE_OPTIONS = require("../../config/cookieOptions");

exports.logout = (req, res) => {
  res.clearCookie("token", COOKIE_OPTIONS);
  res.status(200).json({ message: "Logged out successfully" });
};

exports.me = (req, res) => {
  // authMiddleware already verified token and set req.user
  if (!req.user) {
    return res.status(200).json({ authenticated: false });
  }

  res.status(200).json({
    authenticated: true,
    user: req.user // This includes userId/ownerId, email, and role
  });
};

exports.getRole = (req, res) => {
  res.status(200).json({ role: req.user.role });
};