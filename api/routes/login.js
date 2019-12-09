//contains login router
const express = require('express')
const router = express.Router()
const helpers = require('../helpers/notification.helper')
const users = require("../../models/users")
const bcrypt = require("bcryptjs")
const errorCodes = require('../constants/errorCodes')

router.post('/', (req, res) => {
    let email = req.body.email
    let password = req.body.password
    users.find({
        email: email
    }).exec(function (err, user) {
        if (err) return console.log(err);
        if (user[0]) {
            let type = user[0].type
            
            bcrypt.compare(password,user[0].password, function (err, flag) { 
                if ((user[0].email === email) && flag) {
                    return res.json({
                        authData: helpers.createToken(type, email, user[0]._id),
                        userData: {
                            type: type,
                            email: email,
                            userId: user[0]._id,
                        }
                    })
                } else {

                    return res.json({message: "Either your E-mail or Password is wrong.",
                                    errorCode: errorCodes.notificationCodes.wrongLoginData
                                })
                }
            })
        } else
            return res.json({message:"You don't have an account, Please Sign-Up to create an Account and try again.",
                            errorCode: errorCodes.notificationCodes.unauthenticated
                        })
    })
    
})

module.exports = router