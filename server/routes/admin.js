var mongoose = require( 'mongoose' );
var Admin = require('../models/admin');
var jwt = require('jsonwebtoken'); 
var config = require('../config');


exports.signup = function(req, res, next){
   // Check for registration errors
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const email = req.body.email;
    const image = req.body.image;
    // const username = req.body.username;
    const password = req.body.password;

    if (!firstname || !lastname || !email || !image || !password ) {
        return res.status(422).json({ success: false, message: 'Posted data is not correct or incomplete.'});
    }

    Admin.findOne({ email: email }, function(err, existingUser) {
        if(err){ res.status(400).json({ success: false, message:'Error processing request '+ err}); }

        // If user is not unique, return error
        if (existingUser) {
            return res.status(201).json({
                success: false,
		message: 'Email already exists.'
            });
        }

        // If no error, create account
        let oAdmin = new Admin({
            firstname: firstname,
            lastname: lastname,
            email: email,
            image: image,
            // username: username,
            password: password
        });

        oAdmin.save(function(err, oAdmin) {
            if(err){ res.status(400).json({ success: false, message:'Error processing request '+ err}); }
        
            res.status(201).json({
                success: true,
		message: 'Admin created successfully, please login to access your account.'
            });
        });
    });
}

exports.login = function(req, res, next){
    // find the user
    Admin.findOne({ email: req.body.email }, function(err, admin) {
		if(err){ res.status(400).json({ success: false, message:'Error processing request '+ err}); }

		if (!admin) {
			res.status(201).json({ success: false, message: 'Incorrect login credentials.' });
		}else if (admin) {
			admin.comparePassword(req.body.password, function (err, isMatch) {
                if (isMatch && !err) {
                    var token = jwt.sign(admin.toJSON(), config.secret, {
			expiresIn: config.tokenexp
		    });
                    
                    let last_login = admin.lastlogin;
                    
                    // login success update last login
                    admin.lastlogin = new Date();
                
                    
                    admin.save(function(err) {
                        if(err){ res.status(400).json({ success: false, message:'Error processing request '+ err}); }

                        res.status(201).json({
                            success: true,
                            message: {'userid': admin._id, 'email': admin.email,'lastname': admin.lastname, 'firstname': admin.firstname, 'image': admin.image, 'lastlogin': last_login},
                            token: token
                        });
                    });
                } else {
                    res.status(201).json({ success: false, message: 'Incorrect login credentials.' });
                }
            });	
		}
	});
}

exports.authenticate = function(req, res, next){
    // check header or url parameters or post parameters for token
	var token = req.body.token || req.query.token || req.headers['authorization'];
    //console.log(token);
	if (token) {
		jwt.verify(token, config.secret, function(err, decoded) {			
			if (err) {
				return res.status(201).json({ success: false, message: 'Authenticate token expired, please login again.', errcode: 'exp-token' });		
			} else {
				req.decoded = decoded;	
				next();
			}
		});
	} else {
		return res.status(201).json({ 
			success: false, 
			message: 'Fatal error, Authenticate token not available.',
            		errcode: 'no-token'
		});
	}
}

exports.getadminDetails = function(req, res, next){
    Admin.find({_id:req.params.id}).exec(function(err, admin){
        if(err){ res.status(400).json({ success: false, message: 'Error processing request '+ err}); }
        res.status(201).json({
		success: true, 
		data: admin
	});
    });
}

exports.updateAdmin = function(req, res, next){
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const email = req.body.email;
	const userid = req.params.id;

    if (!firstname || !lastname || !userid) {
        return res.status(422).json({ success: false, message: 'Posted data is not correct or incompleted.'});
    } else {
	Admin.findById(userid).exec(function(err, admin){
		if(err){ res.status(400).json({ success: false, message: 'Error processing request '+ err }); }
			
		if(admin){
			admin.firstname = firstname;
			admin.lastname = lastname;
			admin.email = email;
		}
		admin.save(function(err){
			if(err){ res.status(400).json({ success: false, message:'Error processing request '+ err }); }
			res.status(201).json({
				success: true,
				message: 'Profile updated successfully'
			});
		});
	});
   }
}

exports.updateApassword = function(req, res, next){
    const userid = req.params.id;
    const oldpassword = req.body.oldpassword;
    const password = req.body.password;

    if (!oldpassword || !password || !userid) {
        return res.status(422).json({ success: false, message: 'Posted data is not correct or incompleted.'});
    } else {
        
	Admin.findOne({ _id: userid }, function(err, admin) {
            if(err){ res.status(400).json({ success: false, message:'Error processing request '+ err}); }
            if (admin) {
                admin.comparePassword(oldpassword, function (err, isMatch) {
                    if (isMatch && !err) {
                        
                        admin.password = password;

                        admin.save(function(err) {
                            if(err){ res.status(400).json({ success: false, message:'Error processing request '+ err}); }

                            res.status(201).json({
                                success: true,
                                message: 'Password updated successfully'
                            });
                        });
                    } else {
                        res.status(201).json({ success: false, message: 'Incorrect old password.' });
                    }
                });	
            }
        });
    }
}
