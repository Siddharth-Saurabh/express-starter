const mongoose = require('mongoose'); 
const serverConfig = require('./serverConfig');  

async function connectToDB() {
    try {
        await mongoose.connect(serverConfig.DB_URL);
        console.log("✅ Connected to MongoDB");
    } catch (error) {
        console.error("❌ Error connecting to DB", error);
        process.exit(1); 
    }
}

module.exports = connectToDB;
