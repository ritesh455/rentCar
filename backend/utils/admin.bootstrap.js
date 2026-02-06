const db = require("../config/firebase");
const bcrypt = require("bcrypt");

module.exports = async () => {
  const email = process.env.ROOT_ADMIN_EMAIL;
  const password = process.env.ROOT_ADMIN_PASSWORD;

  const snap = await db
    .collection("admins")
    .where("email", "==", email)
    .limit(1)
    .get();

  if (!snap.empty) {
    console.log("✔ ROOT admin already exists");
    return;
  }

  const passwordHash = await bcrypt.hash(password, 10);

  await db.collection("admins").add({
    email,
    name: "System Owner",
    role: "root",
    isActive: true,

    createdBy: "SYSTEM",
    createdByName: "SYSTEM",

    passwordHash,
    createdAt: new Date()
  });

  console.log("🔥 ROOT admin created automatically");
};
