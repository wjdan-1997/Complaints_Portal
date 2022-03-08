const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const complaintSchema = new Schema(
    {
        subject: { type: String, required: true },
        complainType: { type: String, required: true },
        description: { type: String, required: true },
        severity: { type: String, required: true },
        status: { type: String, required: true },
        preferedLanguage: { type: String, required: true },
        userId: { type: String, },
        openedBy: { type: String}, // name
        updatedByUserId: { type: String,}, //admin
    }
)
module.exports = mongoose.model(
    'complaintSchema', complaintSchema
)// 