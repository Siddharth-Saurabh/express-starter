const { loginUser } = require("../services/authService");

async function login(req,res){
    
    try{
        const loginPayload = req.body;
        const response = await loginUser(loginPayload);
        return res.status(200).json({
            success: true,
            message: "User logged in successfully",
            data: response,
            error:{}
        })
    }
    catch(error){
        return res.status(error.statusCode).json({
            success: false,
            message: "Error while logging in",
            data: {},
            error: error.reason
        })
    }

}
module.exports = { login };