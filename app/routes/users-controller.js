"use strict";

const jwt = require('jsonwebtoken');  
const User = require('../models/user');
const authConfig = require('../../passport/auth');

// 2 helper functions
function generateToken(user){
    return jwt.sign(user, authConfig.secret, {
        expiresIn: 10080
    });
}
 
function setUserInfo(request){
    return {
        _id: request._id,
        email: request.email,
        role: request.role
    };
}

exports.login = function(req, res, next){
 
    let userInfo = setUserInfo(req.user);

    res.status(200).json({
        token: 'JWT ' + generateToken(userInfo),
        user: userInfo
    });
 
}
 
exports.register = function(req, res, next){
 
    let email = req.body.email;
    let password = req.body.password;
    let role = req.body.role;
 
    if(!email){
        return res.status(422).send({error: 'You must enter an email address'});
    }
 
    if(!password){
        return res.status(422).send({error: 'You must enter a password'});
    }
 
    User.findOne({email: email}, function(err, existingUser){
 
        if(err){
            return next(err);
        }
 
        if(existingUser){
            return res.status(422).send({error: 'That email address is already in use'});
        }
 
        let user = new User({
            email: email,
            password: password,
            role: role
        });
 
        user.save(function(err, user){
 
            if(err){
                return next(err);
            }
 
            let userInfo = setUserInfo(user);
 
            res.status(201).json({
                token: 'JWT ' + generateToken(userInfo),
                user: userInfo
            })
 
        });
 
    });
 
}

exports.checkUserRole = function(req, res, next){

    User.findById({ '_id': req.body._id },'role', function(err, role){

            if(err){
                res.status(422).json({error: 'No user found.'});
                return next(err);
            }
            
            //If no errors, send them back to the client
            res.json({ data: role });
    });

}

exports.roleAuthorization = function(roles){
 
    return function(req, res, next){
 
        let user = req.user;
 
        User.findById(user._id, function(err, foundUser){
 
            if(err){
                res.status(422).json({error: 'No user found.'});
                return next(err);
            }
 
            if(roles.indexOf(foundUser.role) > -1){
                return next();
            }
 
            res.status(401).json({error: 'You are not authorized sorry!'});
            return next('Unauthorized');
 
        });
 
    }
}

exports.getUsers = function(req,res,next){

        let query = User.find({});
        query.exec((err, users) => {
            if(err) res.send(err);
            //If no errors, send them back to the client
            res.json({ data: users });
        });  
    
}