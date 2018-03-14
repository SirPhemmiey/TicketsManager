import mongoose from 'mongoose';
import passportLocalMongoose  from 'passport-local-mongoose';
import * as bcrypt from 'bcrypt-nodejs';
const SALT_WORK_FACTOR = 10;

 function toLower(string){
    return string.toLowerCase();
}
const UserSchema = new mongoose.Schema({
    username: {required: true, type: String, unique: true, set: toLower},
    password: {required: true, type: String},
    email: {required: true, type: String, unique: true, set: toLower},
    first_name: {required: true, type: String},
    last_name: {required: true, type: String}
});

//for encryption
UserSchema.pre('save', next => {
    let user = this;
    if (!user.isModified('password'))
    return next();

    bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
        if (err) return next(err);
        bcrypt.hash(user.password, salt, (err, hash) => {
            if (err) return next(err);
            user.password = hash;
            next();
        });
    });
})

UserSchema.plugin(passportLocalMongoose);

export default mongoose.model('User', UserSchema);