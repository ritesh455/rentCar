const db = require("../../config/firebase");

exports.getBasicProfile = async (userId, role) => {
  const collection = role === "OWNER" ? "owners" : "users";
  const doc = await db.collection(collection).doc(userId).get();
  
  if (!doc.exists) {
    throw { status: 404, message: "Profile not found" };
  }
  
  const data = doc.data();
  return {
    name: data.name,
    email: data.email,
    role: role
  };
};