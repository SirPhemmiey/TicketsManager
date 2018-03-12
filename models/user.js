import mongoose from 'mongoose';
import passportLocalMongoose  from 'passport-local-mongoose';

const UserSchema = new mongoose.Schema({
    username: {required: true, type: String},
    password: {required: true, type: String},
    email: {required: true, type: String},
    first_name: {required: true, type: String},
    last_name: {required: true, type: String}
});

UserSchema.plugin(passportLocalMongoose);

export default mongoose.model('User', UserSchema);