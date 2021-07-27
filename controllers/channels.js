const Teacher = require("../models/User/Teacher");
const Student = require("../models/User/Student");

const getAllChannels = async (req, res) => {
    try {
        const getTeachers = await Teacher.find().select({"password":0})
        res.status(200).json(getTeachers)
    } catch (error) {
        res.status(400).json(error.message)
    }
}

const followTeacher = async (req, res) => {
    const studentId = req.userId;
    const teacherId = req.params.id;
    console.log("posted")
    try {
        const findStudent = await Student.findById(studentId);

        const findTeacher =  await Teacher.findById(teacherId);
        await findTeacher.students.push(findStudent)

        await findStudent.teachersFollowed.push(findTeacher);
        
        await findStudent.save();

        await findTeacher.save();
        

        res.status(200).json("You have successfully followed")
    } catch (error) {
        res.status(400).json(error.message)
    }
}

const followedChannels = async (req, res) => {
    const userId = req.userId;
    try {
        const getFollowedTeachers = await Student.findById(userId).populate("teachersFollowed").select({"teachersFollowed": 1, "_id":0});
        res.status(200).json(getFollowedTeachers);

    } catch (error) {
        res.status(400).json(error.message)
    }
}

module.exports = {
    getAllChannels,
    followTeacher,
    followedChannels
}