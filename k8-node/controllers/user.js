const moncon = require('../models/db');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const passport = require('passport');
const {ensureAuthenticated, allowAdmin} = require('../config/auth');

//login handle
const login = (req, res, next) => {
    res.render('login', {title: 'Login', currentUser: req.user })
}

const register = (req, res, next) => {
    res.render('register', {title: 'Register', currentUser: req.user })
}

const postLogin = (req, res, next) => {
    passport.authenticate('local', {
        successRedirect : '/',
        failureRedirect : '/users/login',
    }) (req, res, next)
}

const postRegister = (req, res, next) => {
    const{name,email, password, password2, role} = req.body;
    let errors = [];
    console.log(' Name ' + name+ ' email :' + email+ ' pass:' + password+ ' role :' + role);
    if(!name || !email || !password || !password2 || !role) {
        errors.push({msg : "Please fill in all fields"})
    }
    // check if match
    if(password !== password2) {
        errors.push({msg: "paswords don't match"});
    }

    // check if password is more than 6 characters
    if(password.length < 6) {
        errors.push({msg: 'password at least 6 characters'})
    }

    if(errors.length > 0) {
        res.render('register', {
            errors : errors,
            name: name,
            email: email,
            password: password,
            password2: password2,
            role: role})
    } else {
        // validation passed
        User.findOne({email: email}).exec((err,user)=>{
            console.log(user);
            if(user) {
                errors.push({msg: 'email already registered'});
                res.render('register',{errors,name,email,password,password2,role})
            } else {
                const newUser = new User({
                    name : name,
                    email: email,
                    password : password,
                    role : role
                });
                // hash password
                bcrypt.genSalt(10, (err,salt)=>
                    bcrypt.hash(newUser.password,salt,
                        (err,hash)=> {
                            if(err) throw err;
                            // save pass to hash
                            newUser.password = hash;
                            // save user
                            newUser.save()
                                .then((value)=>{
                                    console.log(value)
                                    res.redirect('/users/login');
                                })
                                .catch(value=> console.log(value));
                        }));
            } // ELSE statement ends here
        })
    }
}

const logout = (req, res, next) => {
    req.logout();
    res.redirect('/users/login')
}

module.exports = {login, register, postLogin, postRegister, logout}