const { findUser } = require("../repositories/userRepository");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/serverConfig");

async function loginUser(authDetails){
    const email = authDetails.email;
    const plainPassword = authDetails.password;

    const user = await findUser({email: email});

    if(!user){
        throw {
            statusCode: 404,
            reason: "User not found"
        }

    }

    const isPasswordValid = await bcrypt.compare(plainPassword, user.password);

    if(!isPasswordValid){
        throw {
            statusCode: 401,
            reason: "Invalid Password,please try again"
        }
    }
    
    const token = jwt.sign({email: user.email , id: user._id}, JWT_SECRET, {expiresIn: "60h"});

    return token;
}

module.exports = { loginUser };