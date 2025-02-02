const { model } = require('mongoose');
const { findUser,createUser } = require('../repositories/userRepository');

    async function registerUser(userDetails){

        const user=await findUser({
            email:userDetails.email,
            mobileNumber:userDetails.mobileNumber
        });
        if(user){
            throw {reason:'user with given email and mobile No already exist',statusCode:400};
        }

        const newUser=await createUser({
            email:userDetails.email,
            password:userDetails.password,
            firstName:userDetails.firstName,
            lastName:userDetails.lastName,
            mobileNumber:userDetails.mobileNumber
        });

        if(!newUser){
            throw {reason:'Error while creating user',statusCode:500};
        } 
        return newUser;


    }

module.exports = {registerUser};