import { searchUserId } from '../libs/mysql';

const getUser = async (req, res) => {

	try{

		const id = req.params.id;

		const data = await searchUserId(id);

		if(data){

			res.json({
				message: '用户查询成功',
				success: 1,
				result: data
			})

		}

	} catch(err) {
		return res.status(500).send({
			message: '用户查询失败',
			success: 0
		})
	}

}

export {
	getUser
}