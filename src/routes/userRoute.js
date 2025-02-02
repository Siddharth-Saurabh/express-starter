const express =require('express');
const { CreateUser } = require('../controllers/usercontroller');

const userRouter = express.Router();


userRouter.post('/',CreateUser);


module.exports = userRouter;