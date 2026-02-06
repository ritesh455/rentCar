const multer = require("multer");

module.exports = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    // Multer-specific errors
    if (err.code === "LIMIT_FILE_SIZE") {
      return res.status(400).json({
        message: "File too large. Maximum allowed size is 2MB per file."
      });
    }

    return res.status(400).json({
      message: err.message
    });
  }

  // Other errors
  next(err);
};
