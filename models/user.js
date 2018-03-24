import mongoose from 'mongoose';
import passportLocalMongoose  from 'passport-local-mongoose';
import * as bcrypt from 'bcrypt-nodejs';
const SALT_WORK_FACTOR = 10;

 function toLower(string){
    return string.toLowerCase();
}
const UserSchema = new mongoose.Schema({
    username: {required: true, type: String, unique: true, set: toLower},
    password: {type: String},
    email: {required: true, type: String, unique: true, set: toLower},
    first_name: {required: true, type: String},
    last_name: {required: true, type: String}
});
// UserSchema.methods.validPassword = (pwd) => {
//     return (this.password === pwd);
// }
//generating the hash
// UserSchema.methods.generateHash = (password) => {
//     return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
// }
// //checking if password is valid
// UserSchema.methods.validPassword = (password) => {
//     return bcrypt.compareSync(password, this.local.password);
// }

//for encryption
// UserSchema.pre('save', next => {
//     let user = this;
//     // if (!user.isModified('password'))
//     // return next();

//     bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
//         if (err) return next(err);
//         bcrypt.hash(user.password, salt, (err, hash) => {
//             if (err) return next(err);
//             user.password = hash;
//             next();
//         });
//     });
// })

// //for comparing
// UserSchema.methods.comparePassword = (password, cb) => {
//     bcrypt.compare(password, this.password, (err, isMatch) => {
//         cb(err, isMatch);
//     })
// }

UserSchema.plugin(passportLocalMongoose);

// export default mongoose.model('User', UserSchema);
module.exports = mongoose.model('User', UserSchema);