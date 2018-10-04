import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const user = new Schema({

	name: String,
    password: String,
    email: String,
    emailCode: String,
    createdTime: Number

});

export default mongoose.model('User', user);