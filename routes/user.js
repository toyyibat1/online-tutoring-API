// const express = require('express');
// const router = express.Router();
// const userController = require('../controllers/user');
// const auth = require('../middleware/auth')
 
// router.post('/signup', userController.signUp);
 
// router.post('/login', userController.logIn);
 
// router.get('/user/:userId', userController.allowIfLoggedin, userController.getUser);
 
// router.post('/users', userController.allowIfLoggedin, userController.getUsers);
 
// router.put('/user/:userId', userController.allowIfLoggedin, userController.grantAccess('updateAny', 'profile'), userController.updateUser);
 
// router.delete('/user/:userId', userController.allowIfLoggedin, userController.grantAccess('deleteAny', 'profile'), userController.deleteUser);
 
// module.exports = router;