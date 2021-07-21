const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SubjectSchema = new Schema({
    subjectName:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    video:{
        type: String,
        required: true
    },
    teacher:{
        type: Schema.Types.ObjectId,
        ref: "Teacher"
    }
});

const Subject = mongoose.model("Subject", SubjectSchema);

module.exports = Subject;