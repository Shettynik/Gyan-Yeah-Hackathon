const express = require("express");
const { getAllChannels, followTeacher } = require("../controllers/channels");
const { checkAuthToken } = require("../middlewares/checkAuthToken");
const router = express.Router();

router.route("/").get(getAllChannels);
router.route("/follow/:id").post(checkAuthToken, followTeacher)

module.exports = router;