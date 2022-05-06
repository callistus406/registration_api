const bcrypt = require("bcrypt");
const saltRounds = 10;

async function hashedPasswords(password) {
  const hashed = await bcrypt.hash(password, saltRounds);
  return hashed;
}
async function decodePasswords(plainPassword, hashedPassword) {
  const decode = await bcrypt.compare(plainPassword, hashedPassword);
  return decode;
}

module.exports.hashedPassword = hashedPasswords;
module.exports.decodePassword = decodePasswords;
