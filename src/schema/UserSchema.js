const mongoose = require('mongoose');  
const bcrypt = require('bcrypt');
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'First Name is required'],
        minlength: [5, 'First Name must be at least 5 characters'],
        lowercase: true,
        trim: true,
        maxlength: [50, 'First Name must be at most 50 characters']
    },
    lastName: {
        type: String,
        required: [true, 'Last Name is required'],
        minlength: [5, 'Last Name must be at least 5 characters'],
        lowercase: true,
        trim: true,
        maxlength: [50, 'Last Name must be at most 50 characters']
    },
    mobileNumber: {
        type: String,
        required: [true, "Mobile Number is required"],
        trim: true,
        unique: true,
        match: [/^\d{10}$/, "Please enter a valid mobile number"],
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        trim: true,
        unique: true,
        match: [/.+\@.+\..+/, "Please enter a valid email address"],
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [6, "Password must be at least 6 characters"],
        maxlength: [20, "Password must be at most 20 characters"],       
    }
}, { timestamps: true });

userSchema.pre('save',async function(){
    console.log("Pre save hook called");
    const hasedPassword = await bcrypt.hash(this.password, 10);
    this.password = hasedPassword;
    console.log(this);
})

const User = mongoose.model('User', userSchema);
module.exports = User;
