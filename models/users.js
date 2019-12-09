//contains user model
const mongoose = require('mongoose')

let  users = mongoose.Schema({
    userName: { type : String },
    email: { type : String , unique: true},
    phoneNumber:{ type : String , unique: true },
    type:{type : String , enum : ['Student', 'Dr','TA']},
    password:{ type : String } ,
    courses:{type:[String]}
}, {
    timestamps: true
})

module.exports = mongoose.model('users', users)

