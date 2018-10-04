import { updateUser } from '../libs/mysql';

const putUser = async (req, res) => {

	try{

		const id = req.params.id;
		const password = req.body.password;

		let value = [ password, id ];

		let data = await updateUser(value);

		if(data){

			res.json({
				message: '更改成功',
				success: 1,
				result: data
			})

		}

	} catch(err) {
		return res.status(500).send({
			message: '更改错误',
			success: 0
		})
	}

}

export {
	putUser
}