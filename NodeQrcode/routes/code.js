import express from 'express';
const router = express.Router();

import { exportCode } from '../controller/code';

router.route('/')
	.post(exportCode);

export default router;