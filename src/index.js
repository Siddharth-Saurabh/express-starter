const express = require('express');
require('dotenv').config();  // Load environment variables
const bodyParser = require('body-parser');

const serverConfig = require('./config/serverConfig');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());

const PORT = serverConfig.PORT;

app.listen(PORT, () => {
    console.log(`Server started at port ${PORT}`);
});
