import express from 'express';
const router = express.Router();

import { crypted, stringDecrypted } from '../controller/crypto';

router.route('/crypted')
	.post(crypted);

router.route('/decrypted')
	.post(stringDecrypted);

export default router;