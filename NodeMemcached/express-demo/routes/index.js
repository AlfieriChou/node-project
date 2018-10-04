import express from 'express'
import * as userController from '../controller/user'
const router = express.Router()

router.route('/users')
  .get(userController.index)

export default router
