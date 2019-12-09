const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller')
const logger = require('../middleware/logger').verifyToken
router.post('/edit/:id',logger,userController.edit_user)
router.post('/delete/:id',logger,userController.delete_user)
router.get('/get/:id',logger,userController.get_user)
router.post('/create', userController.create_user)
router.post('/viewUsers',logger,userController.view_users)
router.get('/getCourses/:id',logger,userController.get_courses)


module.exports = router