const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const userSchema = new Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true, sparse: true },
        password: { type: String, required: true },
        phoneNumber: { type: Number, required: true },
        education: { type: String },
        gender: String,
        address: { type: String },
        role: {
            type: String,
            default: "user",
            num: ['admin', 'user']
        }
    },
)



module.exports = mongoose.model(
    'userSchema', userSchema
)// 
