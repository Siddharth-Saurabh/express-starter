const { loginUser } = require("../services/authService");

async function login(req,res){
    
    try{
        const loginPayload = req.body;
        const response = await loginUser(loginPayload);

        res.cookie("authToken",response,{
            httpOnly : true,
            secure : false,
            maxAge : 7 * 24 * 60 * 60 * 1000
        })

        return res.status(200).json({
            success: true,
            message: "User logged in successfully",
            data: {},
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