const User=require('../schema/UserSchema');


    
    async function findUser(parameters) {
        const response = await User.findOne({...parameters});
        return response;
    }
    async function createUser(userDetails){
        const response=await User.create(userDetails);
        return response;
    }



module.exports= {findUser,createUser};