const nodemailer = require("nodemailer")
const jwt = require("jsonwebtoken")
const EMAIL = require('../../config/DEVkeys').email
const EmailPass = require('../../config/DEVkeys').emailPass
const accountSid = require('../../config/DEVkeys').accountSid
const authToken = require('../../config/DEVkeys').authToken
const secret = require('../../config/DEVkeys').secret
const client = require('twilio')(accountSid,authToken)



const encapsulate_notification = async (doc,from,to) => {

    let notification ={
        from: from,
        to: to,
        subject: doc.subject,
        text: doc.text
    }
    return  notification
}

const email = async (notification) => {
    console.log(notification)
    let from = notification.from
    let to = notification.to
    let subject = notification.subject
    let text = notification.text
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: EMAIL,
            pass: EmailPass
        }
    })

    let mailOptions = {
        from: from, 
        to: to, 
        subject: subject,
        text: "Hello," + "\n" + text + "\n" + "\n" + "\n" + "\n" + 'Please do not reply to this message, this service is automated',
    }
    return await transporter.sendMail(mailOptions)


}
const sms = async (notification) => {
    let to = notification.to
    let text = notification.text
    let smsIDs = [];
    to.forEach(async function (item) {
        let x = client.messages.create({
            body: text,
            from: '+12017309245',
            to: item
        })
        smsIDs.push(x)
    });

    const resolved = await Promise.all(smsIDs)
    return await Promise.all(smsIDs)
}

function createToken(userType, email, userID) {
    let expirationDate = Math.floor(Date.now() / 1000) + 14400; //4 hours from now...
    var token = jwt.sign({ userType: userType, email: email, userId: userID, exp: expirationDate }, secret);
    return token;
}


module.exports = {
    email,
    sms,
    encapsulate_notification,
    createToken
}