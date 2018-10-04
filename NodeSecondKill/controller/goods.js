import Goods from '../models/goods';

import {findZdy} from './mongooseFunc';
import {returnClientMessage} from './returnClientMessage';

const searchGoods =  async (req, res) => {

	try{

		const goodsName = req.body.goodsName;
		let word = {goodsName: goodsName};

		const doc = await findZdy(Goods,word);

		if(doc.length == 0){
			return res.status(404).send(returnClientMessage('该商品没有找到', 0));
		}

		if(doc){

			let number = [];

			for(let i=0; i<doc.length; i++){

				number.push({
					type: doc[i].type,
					amount: doc[i].amount
				})

			}

			let data = [{
				goodsName: goodsName,
				goodsId: doc[0].goodsId,
				price: doc[0].price,
				number: number
			}]

			res.json(returnClientMessage('商品获取成功',1,data))

		}

	}catch(err){
		return res.status(500).send(returnClientMessage('商品查询错误',0))
	}

}

const secondKill = async (req, res) => {

	try{

		const goodsId = req.body.goodsId;
		const type = req.body.type;
		const searchWord = {$and:[{"goodsId": goodsId},{"type": type}]}

		const goods = await findZdy(Goods, searchWord);

		if(goods.length == 0){
			return res.status(404).send(returnClientMessage('该商品查询不到',0))
		}

		if(goods){

			let data = goods[0].amount;

			if(data<1){
				return res.status(200).send(returnClientMessage('商品已售完，正在补货中',1))
			}

			let amount = data - 1;

			goods[0].amount = amount;

			const result = await goods[0].save();

			res.json(returnClientMessage('抢购成功',1,result))

		}

	}catch(err){
		return res.status(500).send(returnClientMessage('秒杀错误',0))
	}

}

export {
	searchGoods,
	secondKill
}
