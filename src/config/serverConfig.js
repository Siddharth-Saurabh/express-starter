require('dotenv').config();  // Load environment variables

module.exports = {
    PORT: process.env.PORT || 3000,  // Default to 3000 if not set
};
