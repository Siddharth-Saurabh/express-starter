const jwt =require("jsonwebtoken");
const { JWT_SECRET } = require("./config/serverConfig");

async function isLoggedIn(req,res,next){
    const token=req.cookies["authToken"];
    if(!token){
        return res.status(401).json({
            success: false,
            message: "User not logged in",
            data: {},
            error: "User not logged in"
        })
    }

    const decoded = jwt.verify(token,JWT_SECRET);

    if(!decoded){
        return res.status(401).json({
            success: false,
            message: "Invalid token provided",
            data: {},
            error: "Invalid token"
        })
    }

    req.user={
        email: decoded.email,
        id: decoded.id
    }
    next();

}

module.exports={isLoggedIn};