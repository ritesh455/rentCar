exports.validateRegister = ({ name, email, password }) => {
  if (!name || !email || !password) {
    throw { status: 400, message: "Name, email and password are required" };
  }
};

exports.validateVerifyOtp = ({ email, otp }) => {
  if (!email || !otp) {
    throw { status: 400, message: "Email and OTP are required" };
  }
};

exports.validateLogin = ({ email, password }) => {
  if (!email || !password) {
    throw { status: 400, message: "Email and password are required" };
  }
};
