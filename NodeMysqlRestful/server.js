// 导入相关模块
import express 		from 'express';
import bodyParser 	from 'body-parser';
import morgan 		from 'morgan';

// 路由文件
import user 		from './routes/user'

const app = express(); 
const port = process.env.PORT || 3000;

// bodyParser morgan
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());
app.use(morgan('dev'));

app.use(express.static(__dirname + '/public'));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use('/', user);

// 封掉不让访问的接口
// 所有get不到信息的接口
app.route("*").get((req, res) => {
	return res.status(500).send({
		message: 'get接口有误'
	});
});

// 所有post不到信息的接口
app.route("*").post((req, res) => {
	return res.status(500).send({
		message: 'post接口有误'
	});
});

// 所有put不到信息的接口
app.route("*").put((req, res) => {
	return res.status(500).send({
		message: 'put接口有误'
	});
});

// 所有delete不到信息的接口
app.route("*").delete((req, res) => {
	return res.status(500).send({
		message: 'delete接口有误'
	});
});

app.listen(port);

console.log(`listening on port ${port}`);

export default app;
