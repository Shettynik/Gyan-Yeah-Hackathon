const Teacher = require("../models/User/Teacher");
const Subject = require("../models/Subject");
const { UploadStorage } = require("../utils/videoUpload");

const getTeacherInfo = async (req, res) => {
    const id = req.userId;
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
    const id = req.userId;
    const {subjectName, description, video} = req.body;
    try {
        console.log("Body", req.body)
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
                return res.status(400).json(err.message)
            }
            res.status(200).json(req.file.location)
        } catch (error) {
            res.status(400).json(error.message)
        }
    })
}

const deleteSubjectById = async (req, res) => {
    const id = req.userId
    const {subjectId} = req.params;
    try {
        const deleteSubject =  await Subject.findByIdAndDelete(subjectId, (err, data) => {
            if(!err){
                console.log(data)
            }
        });

        const getTeacher = await Teacher.findById(id);
        await getTeacher.subjectsCreated.pull({"_id" : subjectId});
        await getTeacher.save()

        res.send("deleted")
        
    } catch (error) {
        console.log(error.message)
    }
}
 
module.exports = {
    getTeacherInfo,
    addSubject,
    uploadVideo,
    deleteSubjectById
}