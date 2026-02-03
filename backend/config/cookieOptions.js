const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax", // use "none" if frontend & backend are on different domains
  maxAge: 7 * 24 * 60 * 60 * 1000
};

module.exports = COOKIE_OPTIONS;