import moment from 'moment';

import Bitcoin from '../models/bitcoin';
import { Block, BlockChain } from './chain/pow';

const getBitCoin = (index) => {

	return new Promise(async (resolve, reject) => {

		try{

			const doc = await Bitcoin.findOne({index: index});
			
			return resolve(doc);

		} catch(err) {

			return reject(err);

		}

	})

}

const pow = async (req, res) => {

	try{

		const index = req.body.index;
		const name = req.body.name;

		if(!index){
			return res.status(400).send({
				message: '次序不能为空',
				success: 0
			})
		}

		if(!name){
			return res.status(400).send({
				message: '请登录用户',
				success: 0
			})
		}

		const doc = await getBitCoin(index);
		
		let own = doc.owner;

		if(own){

			let word = '该节点的拥有者是'+ own ;

			return res.status(200).send({
				message: word,
				success: 1,
				result: [doc]
			})

		}

		let amount = doc.amount;
		let timestamp = doc.timestamp;
		let previousHash = doc.previousHash;

		let bitcoin = new BlockChain();

		let newblock = new Block(index, timestamp, amount, previousHash);

		bitcoin.addBlock(newblock);

		let result = bitcoin.chain;

		let previous = result[1].previousHash;
		let nonceHash = result[1].hash;
		
		if(nonceHash){

			doc.owner = name;

			const result = await doc.save();

		}
		
		// result: [result[1]]
		res.json({
			message: '计算成功',
			hash: nonceHash
		})

	}catch(err) {
		return res.status(500).send({
			message: '计算错误',
			success: 0
		})
	}

}

export {
	pow
}
