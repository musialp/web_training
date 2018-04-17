const   db  = require('../models')
        jwt = require('jsonwebtoken');

exports.signin = async function(req, res, next) {
    try {
        // finding a user
        let user = await db.User.findOne({
            email: req.body.email
        });
        let { id, username, profileImageUrl } = user;
        // checking if the password matches what was sent to the server
        let isMatch = await user.comparePassword(req.body.password);
        // if it all matches
        if(isMatch){
            let token = jwt.sign({ id, username, profileImageUrl }, process.env.SECRET_KEY);
            // login user
            return res.status(200).json({
                id,
                username,
                profileImageUrl,
                token
            })
        } else {
            return next({
                status: 400,
                message: "Invalid Email/Password"
            })
        }
    } catch(err) {
        return next({
            status: 400,
            message: "Invalid Email/Password"
        })
    }
}

exports.signup = async function(req, res, next) {
    try {
        // crate user
        let user = await db.User.create(req.body);
        let { id, username, profileImageUrl } = user;
        // create a token (signing a token)
        // process.env.SECRET_KEY
        let token = jwt.sign({ id, username, profileImageUrl }, process.env.SECRET_KEY);
        return res.status(200).json({
            id,
            username,
            profileImageUrl,
            token
        });
    } catch(err) {
        // see what kind of error
        // if validation fails!
        if(err.code === 11000) {
            // resond with username/email already taken
            err.massege = 'Sorry, that username and/or email is already taken';
        }
        return next({
            // otherwise just send back a generic 400
            status: 400,
            message: err.message
        })
    }
}
