'use strict'

class UserController extends BaseController {

	async signup () {

		const { ctx, service, schema } = this
	    const result = await Joi.validate({
	    	phone: ctx.request.body.phone,
	    	passwrd: ctx.request.body.password
	    })
	    ctx.body = await service.user.signup(ctx.request.body)

	}

	async login () {

	    const { ctx, service, schema } = this
	    const result = await Joi.validate({
	    	phone: ctx.request.body.phone,
	    	passwrd: ctx.request.body.password
	    })
	    ctx.body = await service.user.login(ctx.request.body)
	}

	async getUser () {

	    const { ctx, service } = this
	    ctx.body = await service.user.getUser(ctx.params)
	}

	async update () {
		const {ctx, service, schema } = this
		let password = ctx.request.body.password
		console.log(password);
		ctx.body = await service.user.update(ctx.params, password)
	}

	async destroy () {

	    const { ctx, service } = this
	    ctx.body = await service.user.destroy(ctx.params)
	}

}

module.exports = UserController;