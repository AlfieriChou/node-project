import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const bitcoin = new Schema({

	index: {type: String},
	timestamp: {type: String},   
	data: {type: String},
	amount: {type: String},
	previousHash: {type: String},
	hash: {type: String},
	owner: {type: String}

});

export default mongoose.model('Bitcoin', bitcoin);
