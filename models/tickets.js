const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const TicketSchema = new mongoose.Schema({
    username: {required: true, type: String},
    subject: {required: true, type: String},
    date_time: {required: true, type: Date},
    status: {required: true, type: String}
});

TicketSchema.plugin(passportLocalMongoose);

export default mongoose.model('Ticket', TicketSchema);