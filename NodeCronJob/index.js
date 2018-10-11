const CronJon = require('cron').CronJob
new CronJon('1 * * * * *', () => {
  const date = new Date()
  console.log('------->', date.getSeconds())
  console.log('------->', 'what？')
}, null, true, 'Asia/Shanghai')
