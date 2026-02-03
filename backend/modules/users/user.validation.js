exports.validateRegister = ({ name, email, password ,phone}) => {
  if (!name || !email || !password || !phone || !password) {
    throw { status: 400, message: "Name, email, phone no. and password are required" };
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
