import KoaRouter from 'koa-router'
import * as userController from '../controller/user'
const api = KoaRouter()

api.get('/users', userController.index)
api.get('/users/:id', userController.show)
api.get('/list', userController.list)
api.get('/tags', userController.tags)

export default api
