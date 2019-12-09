const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller')

router.post('/edit/:id',userController.edit_user)
router.post('/delete/:id',userController.delete_user)
router.get('/get/:id',userController.get_user)
router.get('/create', userController.create_user)
router.post('/viewUsers',userController.view_users)
router.get('/getCourses/:id',userController.get_courses)


module.exports = router