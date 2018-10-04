// 导入相关模块
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import morgan from 'morgan';

// 导入公用方法

// 用户部分
import cryptoRoute from './routes/index';

const app = express(); 
const port = process.env.PORT || 4000;

// bodyParser morgan
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());
app.use(morgan('dev'));

app.use(express.static(__dirname + '/client/dist'));

app.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE');
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});

// API 调用公共接口
// 首页
app.use('/', cryptoRoute);

// 所有get不到信息的接口
app.route("*").get((req, res) => {
	res.send('get接口有误');
});

// 所有get不到信息的接口
app.route("*").post((req, res) => {
	res.send('post接口有误');
});

// 所有get不到信息的接口
app.route("*").put((req, res) => {
	res.send('put接口有误');
});

app.listen(port);

console.log(`listening on port ${port}`);
