const express = require("express");
const { getAllChannels, followTeacher, followedChannels } = require("../controllers/channels");
const { checkAuthToken } = require("../middlewares/checkAuthToken");
const router = express.Router();

router.route("/").get(getAllChannels);
router.route("/follow/:id").post(checkAuthToken, followTeacher);
router.route("/following").get(checkAuthToken, followedChannels);

module.exports = router;