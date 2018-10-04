import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const goods = new Schema({

    goodsName: {type: String},
    goodsId: {type: String},   
	type: {type: String},
	amount: {type: Number}

});

export default mongoose.model('Goods', goods);