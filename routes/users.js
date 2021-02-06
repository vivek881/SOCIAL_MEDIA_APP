const express = require('express');
const router = express.Router();
const passport = require('passport');


const User = require('../models/user');
const userController = require('../controllers/userController');

//display signup and signin forms
router.get('/sign-up', userController.signUp);
router.get('/sign-in',userController.signIn);

// create a user
router.post('/create',userController.create);

// log in a user use passport as a middleware to authenticate
router.post('/create-session', passport.authenticate(
    'local',
    {failureRedirect: '/users/sign-in'},
), userController.createSession);



router.get('/auth/google',passport.authenticate('google',{scope: ['profile','email']}));
router.get('/auth/google/callback',passport.authenticate('google',{failureRedirect:'/users/sign-in'}),userController.createSession);

module.exports = router;




