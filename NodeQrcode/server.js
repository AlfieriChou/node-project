// 导入相关模块
import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';

import codeRoute from './routes/code';

const app = express(); 
const port = process.env.PORT || 5000;

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

app.use('/code', codeRoute);


app.listen(port);

console.log(`listening on port ${port}`);

export default app;
