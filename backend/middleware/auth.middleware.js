const { verifyToken } = require("../utils/jwt.util");

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Authorization token missing" });
  }

  try {
    const token = authHeader.split(" ")[1];
    const decoded = verifyToken(token);

    // attach owner info to request
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
