import svgCaptcha from 'svg-captcha'

const picture = async (req, res) => {

    try{

    	// createMathExpr加法  create图形
    	const captcha = await svgCaptcha.createMathExpr();
	    req.session.captcha = captcha.text;
	    
	    res.type('svg');
	    return res.status(200).send(captcha.data);

    } catch(err) {

    	return res.status(500).send({
    		message: '生成验证码错误'
    	})

    }
}

const rePicture = async (req, res) => {

	try{

		const input = req.body.input;
		const captcha = req.session.captcha;

		if(captcha == input){

			res.json({
				message: '验证成功'
			})

		} else {

			return res.status(403).send({
				message: '验证失败'
			})

		}

	} catch(err) {

		return res.status(500).send({
			message: '验证错误'
		})

	}

}

export {
	picture,
	rePicture
}
