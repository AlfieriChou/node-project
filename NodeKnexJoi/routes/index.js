import express from 'express';
const api = express.Router();

import { search, createUser, getUser, putUser, delUser } from '../controller/user';
import { dataExport } from '../controller/dataExport';

api.route('/users')
	.get(search);

api.route('/users')
	.post(createUser);

api.route('/users/:id')
	.get(getUser);

api.route('/users/:id')
	.put(putUser);

api.route('/users/:id')
	.delete(delUser);

api.route('/export')
	.get(dataExport);

export default api;