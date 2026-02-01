const crypto = require("crypto");
const bcrypt = require("bcrypt");

function generateOtp() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

async function hashOtp(otp) {
  return await bcrypt.hash(otp, 10);
}

async function compareOtp(otp, hash) {
  return await bcrypt.compare(otp, hash);
}

module.exports = {
  generateOtp,
  hashOtp,
  compareOtp
};
