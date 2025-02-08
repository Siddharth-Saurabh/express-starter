const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const serverConfig = require('./config/serverConfig'); 
const connectToDB = require('./config/dbconfig'); 
const userRouter = require('./routes/userRoute');
const cartRouter = require('./routes/cartRoute');
const authRouter = require('./routes/authRoute');
const { isLoggedIn } = require('./authValidator');
const uploader = require('./middleware/multerMiddleware');
const cloudinary = require('./config/clodinaryConfig')
const app = express();
const fs=require('fs/promises');

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());

app.use('/users',userRouter);

app.use('/carts',cartRouter);

app.use('/auth',authRouter);

const PORT = serverConfig.PORT;

app.get('/ping',isLoggedIn, (req, res) => {
    console.log(req.body);
    console.log(req.cookies);
    console.log(req.user);

    return res.json({
        message: "Pong",
        success: true,
        data: {},
        error: {}
    })

})
app.post('/photo',uploader.single('incomingFile'),async(req,res)=>{
    

    const reasult = await cloudinary.uploader.upload(req.file.path);
    console.log(reasult);
    await fs.unlink(req.file.path);
    return res.json({
        message:'ok'
    })
}
);


async function startServer() {
    await connectToDB(); //  Ensure DB connection is established before using models
    const User = require('./schema/UserSchema'); // Require User model after DB connection

    app.listen(PORT, async () => {
        console.log(`🚀 Server started at port ${PORT}`);

    });
}

startServer(); 
