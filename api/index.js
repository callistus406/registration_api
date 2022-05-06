const express = require("express");

const router = express.Router();
const login = require("./routes/login");
const register = require("./routes/register");
const deleteUser = require("./routes/delete");
const userProfile = require("./routes/profile");
router.use(login);
router.use(register);
router.use(deleteUser);
router.use(userProfile);

module.exports = router;
