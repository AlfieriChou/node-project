import mongoose from 'mongoose';
import { DB_URL, secret } from '../config';

// mongoose配置
const options = {
  	server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } },
  	replset: { socketOptions: { keepAlive: 1, connectTimeoutMS : 30000 } },
  	useMongoClient: true,
  	autoReconnect: true
};

mongoose.Promise = global.Promise;

mongoose.connect(DB_URL, options);

const db = mongoose.connection;

// 打开数据库
db.once('open', () => {
  	console.log('连接数据库成功')
})

// 数据库报错
db.on('error', console.error.bind(console, '连接错误：'));

// 关闭数据库
db.on('close', () => {
  	console.log('数据库断开， 重连ing')
  	// 若是数据库失联则重新链接数据库
  	mongoose.connect(DB_URL, options)
});