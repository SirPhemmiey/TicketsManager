const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const AdminSchema = new mongoose.Schema({
    username: {required: true, type: String},
    password: {required: true, type: String}
});

AdminSchema.plugin(passportLocalMongoose);

export default mongoose.model('Admin', AdminSchema);