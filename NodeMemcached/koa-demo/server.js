import bodyParser from 'koa-bodyparser'
import Koa from 'koa'
import logger from 'koa-logger'
import koabody from 'koa-body'
import index from './routes/index'
import * as config from './config/index'

const app = new Koa()

app.use(async (ctx, next) => {
  if (ctx.request.method === 'OPTIONS') {
    ctx.response.status = 200
  }
  ctx.set('Access-Control-Allow-Origin', ctx.request.header.origin)
  ctx.set('Access-Control-Allow-Credentials', true)
  ctx.set('Access-Control-Max-Age', 86400000)
  ctx.set('Access-Control-Allow-Methods', 'OPTIONS, GET, PUT, POST, DELETE')
  ctx.set('Access-Control-Allow-Headers', 'x-requested-with, accept, origin, content-type')
  await next()
})

app
  .use(logger())
  .use(koabody({}))
  .use(index.routes())
  .use(bodyParser())

if (!module.parent) {
  app.listen(config.port)
  console.log(`✅  The server is running at http://localhost:${config.port}`)
}

export default app
