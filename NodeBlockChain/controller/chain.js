import moment from 'moment';
import SHA256 from 'crypto-js';

import Bitcoin from '../models/bitcoin';

const getBitCoin = (t) => {

	return new Promise(async (resolve, reject) => {

		try{

			const data = await Bitcoin.findOne({index: t});
			
			return resolve(data);

		} catch(err) {

			return reject(err);

		}

	})

}

const chain = async (req, res) => {

	try{

		const index = req.body.index;
		const timestamp = moment(new Date()).format('YYYY-MM-DD');
		const amount = req.body.amount;
		
		if(index>10){
			return res.status(400).send({
				message: '本轮已发布完成，请等待下一轮发布',
				success: 0
			})
		}

		const doc = await Bitcoin.findOne({index: index});

		if(doc){
			return res.status(200).send({
				message: '该次序已颁发',
				result: [doc]
			})
		}

		if(index == 1){

			let previousHash = '';

			let data = SHA256.SHA256(index + previousHash + timestamp + amount).toString();

			previousHash = data;

			let hash = SHA256.SHA256(index + previousHash + timestamp + amount).toString();

			const bitcoin = new Bitcoin({
				index: index,
				timestamp: timestamp,
				amount: amount,
				previousHash: previousHash,
				hash: hash
			})

			const result = await bitcoin.save();

			return res.status(200).send({
				message: 'AlfieriChou Block颁发成功',
				success: 1,
				result: [result]
			})

		} else {

			const t = index - 1 ;
			const data = await getBitCoin(t);

			if(!data){
				return res.status(400).send({
					message: '请按顺序颁发',
					success: 0
				})
			}

			let previousHash = data.hash;

			let hash = SHA256.SHA256(index + previousHash + timestamp + amount).toString();

			const bitcoin = new Bitcoin({
				index: index,
				timestamp: timestamp,
				amount: amount,
				previousHash: previousHash,
				hash: hash
			})

			const result = await bitcoin.save();

			res.json({
				message: 'AlfieriChou Block颁发成功',
				success: 1,
				result
			})

		}

	} catch(err){
		return res.status(500).send({
			message: 'AlfieriChou Block生成错误',
			success: 0
		})
	}

}

export {
	chain
}
