
import mongoose from 'mongoose';
import passportLocalMongoose from 'passport-local-mongoose';
//import dateOnly from 'mongoose-dateonly';
let dateOnly = require('mongoose-dateonly')(mongoose);
let responseComplain = require('../models/responseComplain');
//let User = require('../models/user');
//let Ticket = require('../models/tickets');

const TicketSchema = new mongoose.Schema({
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    //admin: {type: new mongoose.Schema.Types.ObjectId, ref: 'Admin'},
    subject: {type: String},
    complain: {type: String},
    date_time: {type: dateOnly},
    status: {type: String, default: 'pending'},
    //responseId: {type: mongoose.Schema.Types.ObjectId}
},
{
    //strict: false,
    autoIndex: false
});

TicketSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('Ticket', TicketSchema);