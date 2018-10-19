const express = require('express')
const CronJon = require('cron').CronJob

const app = express()

new CronJon('1 * * * * *', () => {
  const date = new Date()
  console.log('------->', date.getSeconds())
  console.log('------->', 'what？')
}, null, true, 'Asia/Shanghai')

app.listen(3000)
console.log(`listening on port 3000`)
