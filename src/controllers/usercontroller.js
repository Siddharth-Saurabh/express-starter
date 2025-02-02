const {model} = require("mongoose");
const {findUser,createUser}=require("../repositories/userRepository");
const {registerUser}=require("../services/userService");

async function CreateUser(req,res){
    console.log("CreateUser Controller called");
    console.log(req.body);

    try{
        const response=await registerUser(req.body);

    return res.json({
        message: "Successfully registered the user",
        sueccess: true,
        data: response,
        error:{}
     })
    }
    catch(error){
        return res.status(error.statusCode).json({
            message: "Error while registering the user",
            success: false,
            data: {},
            error: error.reason
        })
    }
} 

module.exports = { CreateUser };