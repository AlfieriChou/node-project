import jwt from 'jsonwebtoken';
import moment from 'moment';

import User from '../models/user';
import config from '../config';

const createToken = name => {
    let payload = {
        sub: name,
        exp: moment().add(1, 'day').unix()
    };
    return jwt.sign(payload, config.TOKEN_SECRET);
}

const signup = (req, res) => {
    User.findOne({ email: req.body.email }, (err, existingUser) => {
        if (existingUser) {
            return res.status(409).json({ message: '邮箱已存在' });
        }

        const user = Object.assign(new User(), req.body);
        user.save((err, result) => {
            if (err) {
                res.send(err);
            }
            res.json({
                message: '创建用户',
                token: createToken(result.name)
            });
        });
    });
};

const login = (req, res) => {
    User.findOne({ email: req.body.email }, '+password', (err, user) => {
        if (!user) {
            return res.status(401).json({ message: '用户不存在' });
        }
        user.comparePassword(req.body.password, (err, isMatch) => {
            if (!isMatch) {
                return res.status(401).send({ message: '密码不正确' });
            }
            res.json({ message: '登陆成功', token: createToken(user.name) });
        });
    });
};

const verifyAuth = (req, res, next) => {
  
    const token = req.headers['x-access-token'];
    if (token) {

        jwt.verify(token, config.TOKEN_SECRET, function(err, payload) {
      
            if (err) {
                return res.status(403).send({
                    message: '用户认证失败'
                });
            } else {
        
                next();
            }
        });
    } else {
    
        return res.status(403).send({
            message: 'token失败'
        });
    }
};

export {
    signup,
    login,
    verifyAuth
};