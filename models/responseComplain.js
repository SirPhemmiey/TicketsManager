import mongoose from 'mongoose';
import passportLocalMongoose from 'passport-local-mongoose';
//let Ticket = require('../models/tickets');

const responseComplainSchema = new mongoose.Schema({
    ticketId: {type: mongoose.Schema.Types.ObjectId, ref: 'Ticket'},
    response: {type: String, default: ''},
    responseTime: {type: Date, default: ''}
},
{
    autoIndex: false
});

responseComplainSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model('responseComplain', responseComplainSchema);