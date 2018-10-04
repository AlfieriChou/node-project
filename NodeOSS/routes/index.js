import express from 'express';
const api = express.Router();

import { upload } from '../controller/index';

api.route('/upload')
	.post(upload);

export default api;