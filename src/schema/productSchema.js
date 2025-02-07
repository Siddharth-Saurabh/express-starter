const mongoose = require('mongoose');

const productSchema=new mongoose.Schema({

    productName: {
        type: String,
        required: [true, 'Product Name is required'],
        minlength: [5, 'Product Name must be at least 5 characters'],
        lowercase: true,
        trim: true,
        maxlength: [50, 'Product Name must be at most 50 characters']
    },
    description: {
        type: String,
        minlength: [5, 'Description must be at least 5 characters'],
    },
    productImage: {
        type: String,
    },
    price: {
        type: Number,
        required: [true, 'Price is required'],
    }, 
    category: {
        type: String,
        enum:['veg','non-veg','drinks','sides'],
        default: 'veg'
    },
    inStock: {
        type:Boolean,
        required: [true, 'Stock availability is required'],
        default: true
    }

},{
    timestamps:true
});
const Product = mongoose.model('Product', productSchema);
module.exports = Product;
