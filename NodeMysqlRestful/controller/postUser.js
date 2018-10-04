import { insertUser, searchUser } from '../libs/mysql.js';

const createUser = async(req, res) => {

	try{

		const phone = req.body.phone;
		const password = req.body.password;

		if(!phone){
			return res.status(413).send({
				message: '手机号不能为空',
				success: 0
			})
		}

		if(!password){
			return res.status(413).send({
				message: '密码不能为空',
				success: 0
			})
		}

		const exsitingUser = await searchUser(phone);

		if(exsitingUser.length == 0 ){

			const user = {
				phone: phone,
				password: password
			}

			const data = await insertUser(user);

			res.json({
				message: '用户创建成功',
				success: 1,
				word: user,
				result: data
			})

		}

		if(exsitingUser){
			return res.status(200).send({
				message: '用户已存在',
				success: 1,
				result: exsitingUser
			})
		}

	} catch(err) {
		return res.status(500).send({
			message: '用户创建错误',
			success: 0
		})
	}

}

export {
	createUser
}