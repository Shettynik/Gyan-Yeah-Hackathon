const express = require("express");
const { getTeacherInfo, addSubject, uploadVideo, deleteSubjectById } = require("../controllers/teacher");
const router = express.Router();

router.route("/:id").get(getTeacherInfo);
router.route("/addSubject/:id").post(addSubject);
router.route("/uploadVideo/:id").post(uploadVideo);
router.route("/deleteSubject/:id/:subjectId").delete(deleteSubjectById);

module.exports = router;