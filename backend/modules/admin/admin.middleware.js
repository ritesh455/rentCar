const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const auth = req.headers.authorization;

  if (!auth || !auth.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Admin authorization required" });
  }

  const token = auth.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_ADMIN_SECRET);
    req.admin = decoded;
    next();
  } catch {
    res.status(401).json({ message: "Invalid admin token" });
  }
};
