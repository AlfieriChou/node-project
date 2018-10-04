import express from 'express';
const api = express.Router();

import { createUser } from '../controller/postUser';
import { getUser } from '../controller/getUser';
import { putUser } from '../controller/putUser';

api.route('/users')
	.post(createUser);

api.route('/users/:id')
	.get(getUser);

api.route('/users/:id')
	.put(putUser);

export default api;