import crypto from 'crypto';

import { privateKey, pubKey } from './keys';

const crypted = async (req, res) => {

	try {
		
		// 加密过程
		const encrypt = (data, key) => {

			return crypto.publicEncrypt(key, Buffer.from(data));

		}
		// 加密内容
		const text = req.body.text;
		// 加密
		const textCrypted = await encrypt(text, pubKey);
		// buffer转string
		const encrypted = textCrypted.toString('base64');

		res.json({
			message : '加密后',
			encrypted
		});

	} catch (err) {

		return res.status(500).send({
			message : '加密失败'
		});

	}

}

const stringDecrypted = async (req, res) => {

	try {

		// 解密过程
		const decrypt = (encrypted, key) => {

			return crypto.privateDecrypt(key, encrypted);

		};

		const crypted = req.body.crypted;
		// 转成buffer
		const encrypted = new Buffer(crypted, 'base64');
		// 解密
		const textDecrypted = await decrypt(encrypted, privateKey);
		// 转成string
		const decrypted = textDecrypted.toString();

		res.json({
			message: '解密后',
			decrypted
		});

	} catch (err) {

		return res.status(500).send({
			message : '解密失败'
		});

	}

}

export {
	crypted,
	stringDecrypted
}
