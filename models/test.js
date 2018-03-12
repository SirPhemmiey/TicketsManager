import mongoose from 'mongoose';

const testSchema = new mongoose.Schema({
    name: {type: String},
    age: {type: Number}
});
export default mongoose.model('Test', testSchema);