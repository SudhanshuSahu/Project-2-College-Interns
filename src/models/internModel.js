const mongoose = require("mongoose")
const ObjectId = mongoose.Schema.Types.ObjectId
let validateEmail = function (email) {
    let re = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/;
    return re.test(email)
};

let validateMobile = function (mobile) {
    if(mobile.toString().length != 10) return false
    return true
};

const internSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        validate: [validateEmail, 'Please fill a valid email address']
    },
    mobile: {
        type: Number,
        required: true,
        unique: true,
        validate: [validateMobile, 'Please fill a valid Mobile Number']
    },
    collegeId: {
        type: ObjectId,
        ref: "College"
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
}, { timestamps: true })



module.exports = mongoose.model("Intern", internSchema)
