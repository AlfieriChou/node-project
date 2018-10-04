import express from 'express'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import * as config from './config/index'
import route from './routes/index'

const app = express()

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(morgan('dev'))

app.use(express.static('./client'))

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})

app.use('/', route)
app.route('*').get((req, res) => {
  res.send('get接口有误')
})
app.route('*').post((req, res) => {
  res.send('post接口有误')
})
app.route('*').put((req, res) => {
  res.send('put接口有误')
})

app.listen(config.port)
console.log(`listening on port ${config.port}`)
