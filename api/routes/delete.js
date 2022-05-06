const express = require("express");
const router = express.Router();
const verify = require("../../auth/verify");
const { db } = require("../../dbConnection/connection");
const { deleteUser } = require("../../queries/queries");
const { deleteController } = require("../controllers");
router.delete("/delete/:user_id", verify);

module.exports = router;
