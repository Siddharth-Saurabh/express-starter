const Product = require("../schema/productSchema");

async function createProduct(productDetails) {
    try {
        console.log('💾 Attempting to Save:', productDetails);
        const response = await Product.create(productDetails);
        console.log('✅ Product Created Successfully:', response);
        return response;
    } catch (error) {
        console.error('❌ Database Insert Error:', error);

        if (error.name === "ValidationError") {
            return { reason: error.message, statusCode: 400 };
        }

        return { reason: 'Database Error', statusCode: 500 };
    }
}

module.exports = { createProduct }; 