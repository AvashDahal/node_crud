const { default: mongoose } = require('mongoose');
const mongoode = require('mongoose');
const contactSchema= mongoose.Schema({
    name: 
    {
        type: String,
        required : [true,"Please add the contact number"],
    },
    email :
    {
        type: String,
        required : [true,"Please add the email address"],
    },
    phone :
    {
        type: String,
        required : [true,"Please do add the mobile number pleaseeeee"],

    },
},
    {
        timestamp: true,
    }
);
module.exports= mongoose.model("Contact",contactSchema)