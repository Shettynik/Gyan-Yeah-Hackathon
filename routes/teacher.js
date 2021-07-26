const express = require("express");
const { getTeacherInfo, addSubject, uploadVideo, deleteSubjectById } = require("../controllers/teacher");
const { checkAuthToken } = require("../middlewares/checkAuthToken");
const router = express.Router();

router.route("/profile").get(checkAuthToken ,getTeacherInfo);
router.route("/addSubject").post(checkAuthToken, addSubject);
router.route("/uploadVideo").post(checkAuthToken, uploadVideo);
router.route("/deleteSubject/:subjectId").delete(checkAuthToken, deleteSubjectById);

module.exports = router;