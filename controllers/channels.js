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
        await findStudent.teachersFollowed.push(teacherId);

        const findTeacher =  await Teacher.findById(teacherId);
        await findTeacher.students.push(findStudent)
        await findStudent.save();

        await findTeacher.save();
        

        res.status(200).json("You have successfully followed")
    } catch (error) {
        res.status(400).json(error.message)
    }
}

module.exports = {
    getAllChannels,
    followTeacher
}