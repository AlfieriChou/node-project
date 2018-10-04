'use strict'

class UserService extends BaseService {

	async signup ({phone, password}) {

		const exist = await this.app.knex('user').where({phone});

		if(exist.length == 0){
			const result = await this.app.knex('user').insert({phone, password});
			const user = {message: '用户创建成功',result};
			return user
		}

		if(exist){
			const existUser = {message: '用户已存在',exist};
			return existUser
		}

	}

	async login ({phone,password}) {

		const result = await this.app.knex('user').where({phone});

		if(result.length == 0){
			const nouser = {message: '用户不存在'};
			return nouser
		}

	    if(result){
	    	if(password == result[0].password){
	    		const compare = {message: '用户验证成功'}
	    		return compare
	    	} else {
	    		const compareFailed = {message: '用户验证失败'}
	    		return compareFailed
	    	}
	    }

	}

	async getUser ({id}) {

		const result = await this.app.knex('user').where({_id: id});

		if(result.length == 0){
			const nouser = {message: '用户不存在'};
			return nouser
		}

		if(result){
			const data = {message: '用户获取成功', result}
	    	return data
		}
	}

	async update ({id, password}) {

		let repassword = this.ctx.request.body.password;
		
		const result = await this.app.knex('user').where({_id: id}).update({password:repassword});

		if(result){
			const updateUser = {message: '用户修改成功', result}
			return updateUser
		}

	}

	async destroy ({id}) {

		console.log(id);
		const result = await this.app.knex('user').where({_id: id}).del();

		if(result.length == 0){
			const nouser = {message: '用户不存在'};
			return nouser
		}

		if(result){
			const data = {message: '用户删除成功', result}
	    	return data
		}

	}

}

module.exports = UserService