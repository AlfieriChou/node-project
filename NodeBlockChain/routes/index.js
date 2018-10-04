import express from 'express';
const router = express.Router();

import { chain } from '../controller/chain';
import { pow } from '../controller/pow';

router.route('/chain')
	.post(chain);

router.route('/pow')
	.post(pow);

export default router;