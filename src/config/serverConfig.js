require('dotenv').config();  // ✅ Load environment variables once

module.exports = {
    PORT: process.env.PORT || 3000, 
    DB_URL: process.env.DB_URL || 'mongodb://localhost:27017/express-mongo',
    JWT_SECRET: process.env.JWT_SECRET
};
