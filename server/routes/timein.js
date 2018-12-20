var mongoose = require( 'mongoose' );
var Timein = require('../models/timein');
var config = require('../config');
var start = new Date();
start.setHours(0,0,0,0);
var end = new Date();
end.setHours(23,59,59,999);

	exports.savetimein = function(req, res, next){
		const uid = req.params.id;
		const name = req.body.timeinname;
		const email = req.body.timeinemail;
		const dt = req.body.timeindate;
		const time = req.body.timeintime;
		const img = req.body.timeinimage;

		var tart = new Date(dt);
		tart.setHours(0,0,0,0);
		var nd = new Date(dt);
		nd.setHours(23,59,59,999);

	    if (!uid || !name || !email || !dt || !img || !time) {
			return res.status(422).json({ 
				success: false, 
				message: 'Posted data is not correct or incompleted.' 
			});
	    }
			Timein.findOne({userid: uid, timeindate: {$gte: tart, $lt: nd}}, function(err, timein) {
				if(err){ res.status(400).json({ success: false, message:'Error processing request '+ err}); }
		
			
				if (timein) {
					return res.status(201).json({
						success: false,
						message: 'Already timedin'
					});
				}
		
				// If no error, create account
				let oTimein = new Timein({
					userid: uid,
					timeinname: name,
					timeinemail: email,
					timeindate: dt,
					timeintime: time,
					timeinimage: img,
				});
		
				oTimein.save(function(err, oTimein) {
					if(err){ res.status(400).json({ success: false, message:'Error processing request '+ err}); }
				
					res.status(201).json({
						success: true,
						message: 'Timed-in Successfully'
					});
				});
			});
			
	    }
	

exports.gettimeinDetails = function(req, res, next){
	Timein.aggregate([{$match:{userid: req.params.id}},
		{
			$lookup: {
			   from: "timeout",
			   localField: "userid",    // field in the orders collection
			   foreignField: "userid",  // field in the items collection
			   as: "timeoutData"
			}
		 },
		 {$unwind:"$timeoutData"},
		 {
			$project:
			   {	
				   _id: 0,
					timeinname: 1,
					timeindate : {$subtract : ["$timeindate", new Date(Date.UTC('1-1-1970'))] },
					timeintime: 1,
					timeouttime: "$timeoutData.timeouttime",
					userid: 1,
					// timeoutdate: "$timeoutData.timeoutdate",
					//timeinimage: 1,
					//timeoutimage:"$timeoutData.timeoutimage",
					 timeMatch: { $cond: [{ $eq: [ "$timeindate", "$timeoutData.timeoutdate" ] }, 1, 0]},
					 duration: {$divide: [{$subtract: ["$timeoutData.timeouttime", "$timeintime"]}, 3600000]},
					 

			   }
		  },
		  {$match: { timeMatch : 1}},
		  {$project:{timeMatch: 0}},
		  {$sort : {"timeindate": 1}}
	]).exec(function(err, timein){
        if(err){ res.status(400).json({ success: false, message: 'Error processing request '+ err}); }
        res.status(201).json({
		success: true, 
		data: timein
	});
    });
}


exports.gettimeinAll = function(req, res, next){
	Timein.aggregate([
		{
			$lookup: {
			   from: "timeout",
			   localField: "userid",    // field in the orders collection
			   foreignField: "userid",  // field in the items collection
			   as: "timeoutData"
			}
		 },
		 {$unwind:"$timeoutData"},
		 {
			$project:
			   {	
				   _id: 0,
					timeinname: 1,
					timeindate : {$subtract : ["$timeindate", new Date(Date.UTC('1-1-1970'))] },
					timeintime: 1,
					timeouttime: "$timeoutData.timeouttime",
					userid: 1,
					timeoutdate: "$timeoutData.timeoutdate",
					timeinimage: 1,
					timeinemail: 1,
					timeoutimage:"$timeoutData.timeoutimage",
					timeMatch: { $cond: [{ $eq: [ "$timeindate", "$timeoutData.timeoutdate" ] }, 1, 0]},
					duration: {$divide: [{$subtract: ["$timeoutData.timeouttime", "$timeintime"]}, 3600000]},
			   }
		  },
		  {$match: { timeMatch : 1}},
		  {$project:{timeMatch: 0}},
		  {$sort : {"timeindate": -1}},
		//   { $limit : 31 }
	]).exec(function(err, timein){
        if(err){ res.status(400).json({ success: false, message: 'Error processing request '+ err}); }
        res.status(201).json({
		success: true, 
		data: timein
	});
    });
}



exports.gettimeinAlllimit = function(req, res, next){
	Timein.aggregate([
		{
			$lookup: {
			   from: "timeout",
			   localField: "userid",    // field in the orders collection
			   foreignField: "userid",  // field in the items collection
			   as: "timeoutData"
			}
		 },
		 {$unwind:"$timeoutData"},
		 {
			$project:
			   {	
				   _id: 0,
					timeinname: 1,
					timeindate : {$subtract : ["$timeindate", new Date(Date.UTC('1-1-1970'))] },
					timeintime: 1,
					timeouttime: "$timeoutData.timeouttime",
					userid: 1,
					timeoutdate: "$timeoutData.timeoutdate",
					timeinimage: 1,
					timeinemail: 1,
					timeoutimage:"$timeoutData.timeoutimage",
					timeMatch: { $cond: [{ $eq: [ "$timeindate", "$timeoutData.timeoutdate" ] }, 1, 0]},
					duration: {$divide: [{$subtract: ["$timeoutData.timeouttime", "$timeintime"]}, 3600000]},
					month: { $month: "$timeindate"},
					month1: { $month: new Date() },
					monthMatch:{ $cond: [{ $eq: [ "$month", "$month1" ] }, 1, 0]},
			   }
		  },
		  {$match: { timeMatch : 1,monthMatch : 1}},
		  {$project:{timeMatch: 0,monthMatch : 0, month: 0, month1: 0 }},
		  {$sort : {"timeindate": -1}}
	]).exec(function(err, timein){
        if(err){ res.status(400).json({ success: false, message: 'Error processing request '+ err}); }
        res.status(201).json({
		success: true, 
		data: timein
	});
    });
}





exports.gettimein = function(req, res, next){
	Timein.find().sort([['timeindate', -1]]).exec(function(err, timein){
        if(err){ res.status(400).json({ success: false, message:'Error processing request '+ err }); 
        }
        res.status(201).json({
		success: true, 
		data: timein
	});
    });
}

exports.gettimeincurrent = function(req, res, next){
	Timein.find({timeindate: {$gte: start, $lt: end}}).sort([['timeindate', -1]]).exec(function(err, timein){
        if(err){ res.status(400).json({ success: false, message:'Error processing request '+ err }); 
        }
        res.status(201).json({
		success: true, 
		data: timein
	});
    });
}


exports.gettimeinDate = function(req, res, next){
	const uid = req.params.id;
	Timein.findOne({userid: uid,timeindate: {$gte: start, $lt: end}}).sort([['timeindate', -1]]).exec(function(err, timein){
        if(err){ res.status(400).json({ success: false, message:'Error processing request '+ err }); 
        }
        res.status(201).json({
		success: true,
		data: timein,
	});
    });
}


exports.gettimeinccount = function(req, res, next){
	Timein.countDocuments({timeindate: {$gte: start, $lt: end}}).exec(function(err, timein){
        if(err){ res.status(400).json({ success: false, message:'Error processing request '+ err }); 
        }
        res.status(201).json({
		success: true, 
		data: timein
	});
    });
}