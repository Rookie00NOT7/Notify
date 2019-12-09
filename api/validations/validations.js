const Joi = require('joi');

const notificationschema = Joi.object().keys({
    subject: Joi.string(),
    to:Joi.array().items(Joi.object().keys({
        _id:Joi.string().required(),
        userName: Joi.string().required(),
        email: Joi.string().email().required(),
        phoneNumber:Joi.string().regex(/^([+]39)?((3[\d]{2})([ ,\-,\/]){0,1}([\d, ]{6,9}))|(((0[\d]{1,4}))([ ,\-,\/]){0,1}([\d, ]{5,10}))$/)
        .required()
    })).required(),
    text: Joi.string().min(10).required(),
    type:Joi.string().valid("email", "sms").required()
})

const userCreate = Joi.object().keys({
    user: Joi.object().keys({
        userName: Joi.string().required(),
        email: Joi.string().email().required(),
        phoneNumber: Joi.string().
        regex(/^([+]39)?((3[\d]{2})([ ,\-,\/]){0,1}([\d, ]{6,9}))|(((0[\d]{1,4}))([ ,\-,\/]){0,1}([\d, ]{5,10}))$/)
        .required(),
        type:Joi.string().valid("Student", "Dr","TA").required(),
        courses:Joi.array().items(Joi.string().required()).required(),
        password:Joi.string().required()
    })
})

const userEdit = Joi.object().keys({ 
    user: Joi.object().keys({
        userName: Joi.string().optional(),
        email: Joi.string().email().optional(),
        phoneNumber: Joi.string().
        regex(/^([+]39)?((3[\d]{2})([ ,\-,\/]){0,1}([\d, ]{6,9}))|(((0[\d]{1,4}))([ ,\-,\/]){0,1}([\d, ]{5,10}))$/)
        .optional() ,
        type:Joi.string().valid("Student", "Dr","TA").optional(),
        courses:Joi.array().items(Joi.string().required()).required()
    }).required()
})

const userFind = Joi.object().keys({
        userType:Joi.string().valid("Student", "Dr","TA").required(),
        courses:Joi.string().required()
})

module.exports = {
    userCreate,
    userEdit,
    userFind
}