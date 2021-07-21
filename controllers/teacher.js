const Teacher = require("../models/User/Teacher");
const Subject = require("../models/Subject");
const { UploadStorage } = require("../utils/videoUpload");

const getTeacherInfo = async (req, res) => {
    const id = req.params.id;
    try {
        const TeacherInfo = await Teacher.findById(id).select({firstname: 1, lastname: 1, subjectsCreated: 1}).populate("subjectsCreated");
        res.status(200).json(TeacherInfo)
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}

const addSubject = async (req, res) => {
    const id = req.params.id;
    const {subjectName, description, video} = req.body;
    try {
        const newSubject = new Subject({
            ...req.body,
            teacher: id
        });

        const getTeacher = await Teacher.findById(id);
        await getTeacher.subjectsCreated.push(newSubject);
        await getTeacher.save();

        await newSubject.save()

        res.status(200).json(newSubject)
    } catch (error) {
        res.status(500).json({
            error: error.message
        }) 
    }
}

const uploadVideo = async (req, res) => {
    UploadStorage(req, res, (err) => {
        try {
            if(err){
                console.log(err.message)
            }
            console.log(req)
        } catch (error) {
            console.log(error.message)
        }
    })
}
 
module.exports = {
    getTeacherInfo,
    addSubject,
    uploadVideo
}