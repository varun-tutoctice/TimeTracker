const mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');

const Schema = mongoose.Schema;

const TimeoutSchema = new Schema({
    userid: {type:String, required: true},
    timeoutname: {type:String, required: true},
    timeoutemail: {type:String, required: true},
    timeoutdate: {type:Date, required: true},
    timeouttime: {type:Date, required: true},
    timeoutimage:{type:String, required: true},
    timeintime: {type:Date, required: true},
    });

TimeoutSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('timeout', TimeoutSchema, 'timeout');
