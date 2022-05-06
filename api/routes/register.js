const express = require("express");
const router = express.Router();
const { registerController } = require("../controllers");
// beginning of sql queries
router.post("/register", registerController);

module.exports = router;
