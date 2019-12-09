//contains notification model
const url = require('../config/DBconfig')
const mongoose = require('mongoose')
mongoose.connect(url)

let notifications = mongoose.Schema({
    subject: { type : String },
    from :{type : mongoose.Types.ObjectId},
    to: { type : [String] },
    text: { type : String },
    type:{
        type: String,
        enum : ['sms', 'email']
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('notifications', notifications)

