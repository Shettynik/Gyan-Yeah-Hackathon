const express = require("express");
const { getTeacherInfo, addSubject, uploadVideo } = require("../controllers/teacher");
const router = express.Router();

router.route("/:id").get(getTeacherInfo);
router.route("/addSubject/:id").post(addSubject);
router.route("/uploadVideo/:id").post(uploadVideo);

module.exports = router;