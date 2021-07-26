const jwt = require("jsonwebtoken");
const Student = require("../models/User/Student");
const Teacher = require("../models/User/Teacher");
const bcrypt = require("bcryptjs");

const registerAuthController = async (req, res) => {
    const userType = req.params.userType;
    const {firstname, lastname, email, password} = req.body;
    try {

        // Checking Duplicate Email
        const checkEmail = userType === "Teacher" ? await Teacher.findOne({email}) : await Student.findOne({email});
        
        if(checkEmail){
            return res.json({
                error: "Email has already been registered"
            })
        }

        // Checking Password Length
        if(password.length < 6){
            return res.status(400).json({
                error:"Password should contain minimum 6 characters"
            })
        }

        // Hashing Passwords
        const salt = await bcrypt.genSalt();
        const passwordHashed = await bcrypt.hash(password, salt);

        // User Creation
        const data = {firstname, lastname, email, password: passwordHashed}
        const newUser = userType === "Teacher" ? new Teacher(data) : new Student(data);
        await newUser.save();

        const token = await jwt.sign({
            userType: userType,
            user: newUser._id
        }, process.env.SECRET_KEY);

        res.cookie("token", token, {
            expires: new Date(Date.now() * 300000),
            httpOnly: true
        }).send();


    }catch(error) {
        res.status(500).json({
            error: error.message
        })
    }
}

const loginAuthController = async (req, res) => {
    const userType = req.params.userType;
    const {email, password} = req.body;
    try {

        // Checking Duplicate Email
        const getUser = userType === "Teacher" ? await Teacher.findOne({email}) : await Student.findOne({email});
        
        if(!getUser){
            return res.status(401).json({
                error: "Incorrect email or password"
            })
        }

        // Check Passwords
        const passwordCheck = await bcrypt.compare(password, getUser.password);
        if(!passwordCheck){
            return res.status(401).json({
                error: "Incorrect email or password"
            })
        }

        const token = await jwt.sign({
            userType: userType,
            user: getUser._id
        }, process.env.SECRET_KEY);

        res.cookie("token", token, {
            expires: new Date(Date.now() * 300000),
            httpOnly: true
        }).send();


    }catch(error) {
        res.status(500).json({
            error: error.message
        })
    }
}

const logoutAuthController = async (req, res) => {
    res.cookie("token","", {
        httpOnly: true,
        expires: new Date(0)
    }).send();
}

const getLoggedInController = async (req, res) => {
    try {
        const token = req.cookies.token;
        if(!token){
            return res.send({auth: false})
        };

        const decoded = await jwt.verify(token, process.env.SECRET_KEY);
        console.log(decoded)
        res.status(200).json({auth: true, ...decoded})
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}

module.exports = {
    registerAuthController,
    loginAuthController,
    logoutAuthController,
    getLoggedInController
}