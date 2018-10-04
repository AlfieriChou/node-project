import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const bookSchema = new Schema({
	name: String,
	year: Number,
	description: String,
	publish: String,
	postDate: { type: Date, default: Date.now }
});

export default mongoose.model('Book', bookSchema);