const express = require('express');
const router = express.Router();

const notificationController = require('../controllers/notification.controller')

router.post('/sendNotification/:id',notificationController.send_notification)
router.get('/viewNotification/:id', notificationController.view_all_user_notification)


module.exports = router