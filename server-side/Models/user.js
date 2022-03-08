const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const userSchema = new Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true,unique:true },
        password: { type: String, required: true },
        phoneNumber: { type: Number, required: true },
        education: { type: String },
        gender: String,
        address: { type: String },
        isAdmin: { type: Boolean },
    },
)



module.exports = mongoose.model(
    'userSchema', userSchema
)// 
