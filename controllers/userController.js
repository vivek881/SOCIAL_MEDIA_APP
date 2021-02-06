//to controll user action login ,logout ,signup
const User = require('../models/user');




//render signup page
module.exports.signUp = function(req,res){
    return res.render('user_sign_up');
};

//render signin page
module.exports.signIn = function(req,res){
    return res.render('user_sign_in');
};

//create a new user
module.exports.create = async function(req,res){
    if(req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }
    user = await User.findOne({email:req.body.email});

    if(!user){
        User.create(req.body, function(err,user){
           if(err){return res.redirect('back')}
           
           res.redirect('/users/sign-in');
        });
    }
}

// sign in and create a session for the user
module.exports.createSession = function(req, res){
    //req.flash('success', 'Logged in Successfully');
    console.log(res);
    return res.redirect('/');
}

module.exports.destroySession = function(req, res){
    req.logout();
    //req.flash('success', 'You have logged out!');
    return res.redirect('/');
}
