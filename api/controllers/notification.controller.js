const errorCodes = require('../constants/errorCodes')
const helpers = require('../helpers/notification.helper')
const validations = require('../validations/validations')
const joi = require('joi')
const users = require("../../models/users")
const notifications = require("../../models/notifications")
const mongoose=require("mongoose")


exports.send_notification = async (req, res) => {
	let validdata = joi.validate(req.body, validations.notificationschema)
	if (validdata.error != null) {
		return res.json({
			error: {
				message: validdata.error.message,
				code: errorCodes.notificationCodes.notifiationValidationFailed
			}
		})
    }
    else{
        try {
            let info
            let doc = req.body
            let notification
            let type=doc.type
            let from 
            let userId
            let to=[]
            await users.findById(mongoose.Types.ObjectId(req.params.id))
            .then(async user => {
               
                //res.json(user)
                from = (type=='email'? user.email : user.phoneNumber)
                userId=user._id
                let toFromRequest = req.body.to
                
                toFromRequest.forEach(async function (item) {
                    let data= type=='email'?item.email:item.phoneNumber
                    to.push( data)
                })
                notification= await  helpers.encapsulate_notification(doc,from,to)
            })
                if(type==='email')
                {
                    info = await helpers.email(notification)
                    if (info.messageId)
                    {
                        const newNotification = new notifications({
                            from:userId,
                            to: to, 
                            subject: doc.subject,
                            text:doc.text,
                            type:doc.type
                        })
                        newNotification.save()
                        return res.json({
                            data: {
                                message: 'notification sent' 
                            }
                        })
                        .catch(err => {
                            res.json({
                                error: {
                                    message:err.message || "failed to save notification",
                                    statusCode: errorCodes.notificationCodes.notificationCreationFailed
                                }
                            })
                        })
                        
                    }
                }
                else
                {
                   info = await helpers.sms(notification)
                    if (info) {
                        const newNotification = new notifications({
                            from:userId,
                            to: to,
                            text:doc.text,
                            type:doc.type
                        })
                        newNotification.save()
                        let SMSs = [];
                        info.forEach(function (item) {
                            SMSs.push({
                                data: {
                                    success: 'message sent ',
                                    message: 'code: ' + item.sid
                                }
                            })
                        })
                        return res.json(SMSs)
                }
                else
                {
                    return res.json({
                        error: {
                            message: "send notification failed",
                            code: errorCodes.notificationCodes.sendFailed
                        }
                    })
                }
                }
            }
            catch (err) {
                return res.json({
                    error: {
                        message: "UNKNOWN",
                        code: errorCodes.notificationCodes.unknown,
                        error:err.message
                    }
                })
            }
    }
    
    
	

}

exports.view_all_user_notification = async (req, res) => {
	let userId = req.params.id
	if (!userId) {
		return res.json({
			error: {
				message: "userId is required",
				code: errorCodes.notificationCodes.validation
			}
		})
	}
	try {
		
		notifications.find({from:mongoose.Types.ObjectId(userId)})
		.then(notification => {
			if(!notification) {
				return res.json({
					message: "There is no notification sent by you" 
				})         
			}
			return res.json(notification);
		}).catch(err => {
			
			return res.json({
				message: "Error retrieving notifications",
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

