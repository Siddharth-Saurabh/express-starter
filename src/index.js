const express = require('express');
require('dotenv').config();  // Load environment variables

const bodyParser = require('body-parser');
const serverConfig = require('./config/serverConfig'); 
const connectToDB = require('./config/dbconfig'); 
const userRouter = require('./routes/userRoute');
const cartRouter = require('./routes/cartRoute');
const authRouter = require('./routes/authRoute');


const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());

app.use('/users',userRouter);

app.use('/carts',cartRouter);

app.use('/auth',authRouter);

const PORT = serverConfig.PORT;

async function startServer() {
    await connectToDB(); //  Ensure DB connection is established before using models
    const User = require('./schema/UserSchema'); // Require User model after DB connection

    app.listen(PORT, async () => {
        console.log(`🚀 Server started at port ${PORT}`);

    });
}

startServer(); 
