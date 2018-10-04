import express from 'express';
const api = express.Router();

import { searchGoods, secondKill } from '../controller/goods';

api.route('/search')
	.post(searchGoods);

api.route('/secondkill')
	.post(secondKill);

export default api;