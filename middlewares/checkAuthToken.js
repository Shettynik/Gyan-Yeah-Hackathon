const jwt = require("jsonwebtoken");

const checkAuthToken = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if(!token){
            return res.status(401).json("You are not authorized to access this route")
        }
        const decoded = await jwt.verify(token, process.env.SECRET_KEY);
        if(!decoded){
            return res.status(401).json("You are not authorized to access this route")
        }
        req.userId = decoded.user
        req.type = decoded.userType
        next()

    } catch (error) {
        return res.status(500).json(error.message)
    }
}

module.exports = {
    checkAuthToken
}