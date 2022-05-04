const mongoose = require("mongoose")
const ObjectId = mongoose.Types.ObjectId
var validateEmail = function (email) {
    var re = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/;
    return re.test(email)
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
        minlength: 10,
        maxlength: 10

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