const { verifyToken } = require("../utils/jwt.util");

module.exports = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "Not authenticated" });
  }

  try {
    req.user = verifyToken(token);
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
