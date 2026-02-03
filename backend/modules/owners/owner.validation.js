
exports.validateRegister = ({ name, email, password, phone }) => {
  // 1. Check if all fields exist
  if (!name || !email || !password || !phone) {
    throw { status: 400, message: "Name, email, password, and phone are required" };
  }

  // 2. Check if phone is exactly 10 digits (0-9 only)
  // ^ means start, \d means digit, {10} means exactly 10 times, $ means end
  const phoneRegex = /^\d{10}$/;

  if (!phoneRegex.test(phone)) {
    throw { status: 400, message: "Phone number must be exactly 10 digits" };
  }
};

exports.validateOtp = ({ email, otp }) => {
  if (!email || !otp) {
    throw { status: 400, message: "Email and OTP are required" };
  }
};

exports.validateLogin = ({ email, password }) => {
  if (!email || !password) {
    throw { status: 400, message: "Email and password required" };
  }
};