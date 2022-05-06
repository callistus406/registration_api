const express = require("express");
const router = express.Router();
const { profileController } = require("../controllers");
const verify = require("../../auth/verify");
router.get("/profile", verify, profileController);

module.exports = router;
