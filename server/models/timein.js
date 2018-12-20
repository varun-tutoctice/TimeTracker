const mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');

const Schema = mongoose.Schema;

const TimeinSchema = new Schema({
    userid: {type:String, required: true},
    timeinname: {type:String, required: true},
    timeinemail: {type:String, required: true},
    timeindate: {type:Date, required: true},
    timeintime: { type:Date, required: true},
    timeinimage:{type:String, required: true},
    });

TimeinSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('timein', TimeinSchema, 'timein');
