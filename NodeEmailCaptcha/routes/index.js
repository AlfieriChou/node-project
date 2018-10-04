import express from 'express';
const api = express.Router();

import { createUser } from '../controller/user';

api.route('/users')
	.post(createUser);

export default api;