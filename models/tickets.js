
import mongoose from 'mongoose';
import passportLocalMongoose from 'passport-local-mongoose';
let responseComplain = require('../models/responseComplain');
let User = require('../models/user');
let Ticket = require('../models/tickets');

const TicketSchema = new mongoose.Schema({
    user_id: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    //admin: {type: new mongoose.Schema.Types.ObjectId, ref: 'Admin'},
    subject: {required: true, type: String},
    date_time: {required: true, type: Date},
    status: {required: true, type: String, default: 'pending'},
},
{
    timestamps: true
});

TicketSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('Ticket', TicketSchema);