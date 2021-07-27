const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const StudentSchema = new Schema({
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
    teachersFollowed:[{
        type: Schema.Types.ObjectId,
        ref:"Teacher"
    }]
});

const Student = mongoose.model("Student", StudentSchema);

module.exports = Student;