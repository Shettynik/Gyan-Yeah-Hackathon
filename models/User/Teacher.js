const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TeacherSchema = new Schema({
    firstname:{
        type: String,
        required: true
    },
    lastname:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    subjectsCreated:[{
        type: Schema.Types.ObjectId,
        ref:"Subject"
    }],
    students:[{
        type: Schema.Types.ObjectId,
        ref:"Student"
    }]
});

const Teacher = mongoose.model("Teacher", TeacherSchema);

module.exports = Teacher;

