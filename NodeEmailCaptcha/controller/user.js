import nodemailer from 'nodemailer';

import User from '../models/user';

const transporter = nodemailer.createTransport({

	host: 'smtp.qq.com',
	secureConnection: true,
	port: 465,
	auth: {
		user: 'xxxx@qq.com',
		pass: ''
	}

})

const randomCode = () => {
    let arr = [];
    for(let i=0; i<6; i++){
        let number = Math.floor(Math.random() * 9);
        arr.push(number);
    }
    return arr.join('')
}

const createUser = async(req, res) => {

    try{

        const email = req.body.email;
    
        if(!email){
            return res.status(400).send({
                message: '请输入正确的邮箱地址~~',
                success: 0
            })
        }

        const doc = await User.findOne({ email: email });

        if (doc && doc.name !== 'tmp') {
            return res.status(200).send({
                message: '该邮箱已注册',
                success: 1,
                result: doc
            })
        }

        if(!doc){  

            let emailCode = randomCode();
            const createdTime = Date.now();            
            const mailOptions = {
                from: '"alfierichou.com"',
                to: email,
                subject: '亲爱的用户' + email,
                text: 'Hello alfierichou',
                html: [
                    '<p>您好！恭喜您注册成为alfierichou的一员。</p>',
                    '<p>这是一封发送验证码的注册认证邮件，请复制一下验证码填写到注册页面以完成注册。</p>',
                    '<p>本次验证码为：' + emailCode + '</p>',
                    '<p>上述验证码1分钟内有效。如果验证码失效，请您登录网站重新申请认证。</p>',
                    '<p>感谢您注册成为alfierichou用户！</p><br/>',
                    '<p>alfirichou</p>',
                    '<p>'+ (new Date()).toLocaleString() + '</p>'
                ].join('')
            };
            
            const send = await transporter.sendMail(mailOptions);
                
            const user =new User({
                name: 'tmp',
                password: '0000',
                email: email,
                emailCode: emailCode,
                createdTime: createdTime
            });

            const result = await user.save();

            // 1分钟内如果不注册成功，则在数据库中删除这条数据，也就是说验证码会失效
            setTimeout(async() => {
                const search = await User.findOne({ email: email });
                if (search && search.createdTime === createdTime) {
                    const remove = await User.remove({email: email});
                }
            }, 60*1000);
            
            res.json({
                message: '邮箱注册成功,请在一分钟内验证邮件的准确性',
                success: 1,
                result: result
            })
            
        }

        if(doc && doc.name === 'tmp'){

            const removeDoc = await User.remove({email: email});

            let emailCode = randomCode();
            const createdTime = Date.now();           
            const mailOptions = {
                from: '"alfierichou.com"',
                to: email,
                subject: '亲爱的用户' + email,
                text: 'Hello alfierichou',
                html: [
                    '<p>您好！恭喜您注册成为alfierichou的一员。</p>',
                    '<p>这是一封发送验证码的注册认证邮件，请复制一下验证码填写到注册页面以完成注册。</p>',
                    '<p>本次验证码为：' + emailCode + '</p>',
                    '<p>上述验证码1分钟内有效。如果验证码失效，请您登录网站重新申请认证。</p>',
                    '<p>感谢您注册成为alfierichou用户！</p><br/>',
                    '<p>alfirichou</p>',
                    '<p>'+ (new Date()).toLocaleString() + '</p>'
                ].join('')
            };
            
            const send = await transporter.sendMail(mailOptions);
                
            const user =new User({
                name: 'tmp',
                password: '0000',
                email: email,
                emailCode: emailCode,
                createdTime: createdTime
            });

            const result = await user.save();

            // 1分钟内如果不注册成功，则在数据库中删除这条数据，也就是说验证码会失效
            setTimeout(async() => {
                const search = await User.findOne({ email: email });
                if (search && search.createdTime === createdTime) {
                    const remove = await User.remove({email: email});
                }
            }, 60*1000);
            
            res.json({
                message: '邮箱注册成功,请在一分钟内验证邮件的准确性',
                success: 1,
                result: result
            })
        }

    } catch(err) {
        return res.status(500).send({
            message: '邮件发送错误',
            success: 0
        })
    }

}

export {
	createUser
}
