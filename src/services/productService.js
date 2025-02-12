const cloudinary =require('../config/clodinaryConfig')
const productRepository = require('../repositories/productRepositories')
const fs = require('fs/promises')
async function createProduct(productDetails) {
    const imagePath = productDetails.imagePath;
    let productImage = null; // Default to null in case of failure

    if (imagePath) {
        try {
            console.log('Uploading to Cloudinary:', imagePath);
            const cloudinaryResponse = await cloudinary.uploader.upload(imagePath);
            console.log('Cloudinary Response:', cloudinaryResponse);

            productImage = cloudinaryResponse.secure_url;
            await fs.unlink(imagePath); // Delete local file after upload
        } catch (error) {
            console.error('Cloudinary Upload Error:', error);
            throw { reason: 'Not able to create product', statusCode: 500 };
        }
    }

    try {
        const product = await productRepository.createProduct({
            ...productDetails,
            productImage: productImage
        });

        if (!product) {
            throw { reason: 'Not able to create product', statusCode: 500 };
        }

        return product;
    } catch (error) {
        console.error('Database Error:', error);
        throw { reason: 'Not able to create product', statusCode: 500 };
    }
}


module.exports={
    createProduct
}