var mongoose = require( 'mongoose' );
var Timeout = require('../models/timeout');
var config = require('../config');
var start = new Date();
start.setHours(0,0,0,0);
var end = new Date();
end.setHours(23,59,59,999);



exports.savetimeout = function(req, res, next){
	const uid = req.params.id;
	const aname = req.body.timeoutname;
	const aemail = req.body.timeoutemail;
	const adt = req.body.timeoutdate;
	const atime = req.body.timeouttime;
	const aimg = req.body.timeoutimage;
	const atimein = req.body.timeintime;

	var tart = new Date(adt);
	tart.setHours(0,0,0,0);
	var nd = new Date(adt);
	nd.setHours(23,59,59,999);

    if (!uid || !aname || !aemail || !adt || !atime || !aimg || !atimein ) {
        return res.status(422).send({ success: false, message: 'Posted data is not correct or incompleted.' });
    } 
		Timeout.findOne({userid: uid, timeoutdate: {$gte: tart, $lt: nd}}, function(err, timeout) {
			if(err){ res.status(400).json({ success: false, message:'Error processing request '+ err}); }
	
			// If user is not unique, return error
			if (timeout) {
				return res.status(201).json({
					success: false,
			message: 'Already timedout'
				});
			}
	
			// If no error, create account
			let oTimeout = new Timeout({
				userid: uid,
				timeoutname: aname,
				timeoutemail: aemail,
				timeoutdate: adt,
				timeouttime: atime,
				timeoutimage: aimg,
				timeintime: atimein,
			});
	
			oTimeout.save(function(err, oTimeout) {
				if(err){ res.status(400).json({ success: false, message:'Error processing request '+ err}); }
			
				res.status(201).json({
					success: true,
					message: 'Timed-out Successfully'
				});
			});
		});
		
	}



exports.gettimeout = function(req, res, next){
	Timeout.find().sort([['timeoutdate', -1]]).exec(function(err, timeout){
        if(err){ res.status(400).json({ success: false, message:'Error processing request '+ err }); 
        }
        res.status(201).json({
		success: true, 
		data: timeout
	});
    });
}

exports.gettimeoutcurrent = function(req, res, next){
	Timeout.find({timeoutdate: {$gte: start, $lt: end}}).sort([['timeindate', -1]]).exec(function(err, timein){
        if(err){ res.status(400).json({ success: false, message:'Error processing request '+ err }); 
        }
        res.status(201).json({
		success: true, 
		data: timein
	});
    });
}
exports.gettimeoutccount = function(req, res, next){
	Timeout.countDocuments({timeoutdate: {$gte: start, $lt: end}}).exec(function(err, timein){
        if(err){ res.status(400).json({ success: false, message:'Error processing request '+ err }); 
        }
        res.status(201).json({
		success: true, 
		data: timein
	});
    });
}



