const errorCodes = require('../constants/errorCodes')
const validations = require('../validations/validations')
const users = require("../../models/users")
const joi = require('joi')
const mongoose = require('mongoose')
const bcrypt = require("bcryptjs")



exports.edit_user = async (req,res) =>{
    let body = req.body
    let validData = joi.validate(body, validations.userEdit)
    if (validData.error) {
		return res.json({
			error: {
				message: validData.error.message,
				statusCode: errorCodes.notificationCodes.userValidationFailed
			}
		})
	}
	let doc = body.user
	try {
		users.findById(mongoose.Types.ObjectId(req.params.id)).exec(function (err, user) {
			if(!user) {
				return res.json({
					message: "account not found",
				    statusCode: errorCodes.notificationCodes.notFound
				})
			}
			if (doc.userName) user.userName=doc.userName
			if (doc.email) user.email=doc.email
			if (doc.phoneNumber) user.phoneNumber=doc.phoneNumber
			if (doc.type) user.type=doc.type
			if (doc.courses) user.courses=doc.courses
			user.save()
			return res.json({
				data: {
                     StatusCode:0,
					 meesage:"updated successfully",
					 User:user
					 
				}
			})
		   
		})
	}
	catch (err) {
		return res.json({
			error: {
				message: "UNKNOWN",
				statusCode: errorCodes.notificationCodes.unknown,
				err:err.message
			}
		})
	}
}
exports.delete_user = async (req,res) =>{
	try {
		users.findByIdAndRemove({_id:mongoose.Types.ObjectId(req.params.id)})
		.then(user => {
			if(!user) {
				return res.json({
					error: {
						message: "account not found",
						statusCode: errorCodes.notificationCodes.notFound
					}
				})
			}
			return res.json({
				data: {
					 StatusCode:0,
					 meesage:"deleted successfully"
					}
		})
		}).catch(err => {
			return res.json({
				message: "Could not delete user",
				statusCode:errorCodes.notificationCodes.userDeletionFailed,
				error:err
			})
		})
	}
	catch (err) {
		return res.json({
			error: {
				message: "UNKNOWN",
				statusCode: errorCodes.notificationCodes.unknown,
				err:err.message
			}
		})
	}
}

exports.get_user = async (req,res) =>{
	try {
		users.findById({_id:mongoose.Types.ObjectId(req.params.id)})
		.then(user => {
			if(!user) {
				return res.json({
					error: {
						message: "account not found",
						statusCode: errorCodes.notificationCodes.notFound
					}
				})
			}
			return res.json({
				data: {
					 StatusCode:0,
					 data:user
					}
		})
		})
	}
	catch (err) {
		return res.json({
			error: {
				message: "UNKNOWN",
				statusCode: errorCodes.notificationCodes.unknown,
				err:err.message
			}
		})
	}
}
exports.view_users = async (req, res) => {
	let body = req.body
    let validData = joi.validate(body, validations.userFind)
    if (validData.error) {
		return res.json({
			error: {
				message: validData.error.message,
				statusCode: errorCodes.notificationCodes.validation
			}
		})
	}
	try {
		users.find({type:body.userType , courses:body.courses})
		.then(user => {
			if(!user) {
				return res.json({
					message: "No search results" 
				})         
			}
			for(let i = 0;i<user.length;i++){
				var raw = user[i].toObject()
				delete raw.type
				delete raw.createdAt
				delete raw.updatedAt
				delete raw.__v
				delete raw.courses
				delete raw.password
				user[i] = raw
			}
			return res.json(user)
		}).catch(err => {
			
			return res.json({
				message: "Error retrieving users",
				error: err.message
			})
		})
	} catch (err) {
		return res.json({
			error: {
				message: "UNKNOWN",
				code: errorCodes.notificationCodes.unknown,
				err:err.message
			}
		})
	}
}

exports.get_courses = async (req, res) => {
	let userId = req.params.id
   
	try {
		users.findById({_id: mongoose.Types.ObjectId(userId)})
		.then(user => {
			if(!user) {
				return res.json({
					message: "No search results" 
				})         
			}
			
			return res.json(user.courses)
		}).catch(err => {
			
			return res.json({
				message: "Error retrieving users",
				error: err.message
			})
		})
	} catch (err) {
		return res.json({
			error: {
				message: "UNKNOWN",
				code: errorCodes.notificationCodes.unknown,
				err:err.message
			}
		})
	}
}
exports.create_user = async (req, res) => {
    let body = req.body
    let validData = joi.validate(body, validations.userCreate)
    if (validData.error) {
		return res.json({
			error: {
				message: validData.error.message,
				statusCode: errorCodes.notificationCodes.userValidationFailed
			}
		})
	}
	let doc = body.user
	try {
        const newUser = new users({
            userName: doc.userName, 
            email: doc.email,
			phoneNumber:doc.phoneNumber,
			type:doc.type,
			password:bcrypt.hashSync(doc.password.toString(),10).toString(),
			courses:doc.courses
        })
        newUser.save()
        .then(data => {
            res.json({
				data: {
                    StatusCode:0,
                    user:{
                        id: data._id
                    }
				}
			})
        }).catch(err => {
            res.json({
                error: {
                    message:err.message || "failed to create account",
                    statusCode: errorCodes.notificationCodes.userCreationFailed
                }
            })
        })
		


	} catch (err) {
		return res.json({
			error: {
				message: "UNKNOWN",
				statusCode: errorCodes.notificationCodes.unknown,
				err:err.message
			}
		})
	}
}