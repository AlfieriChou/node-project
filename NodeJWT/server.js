import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import morgan from 'morgan';

import { getBooks, getBook, postBook, deleteBook } from './routes/book';
import { signup, login, verifyAuth } from './routes/user';

const app = express();
const port = process.env.PORT || 3000;

const options = {
	server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } },
	replset: { socketOptions: { keepAlive: 1, connectTimeoutMS : 30000 } }
};
mongoose.Promise = global.Promise;
mongoose.connect('127.0.0.1:27017/book', options);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());
app.use(morgan('dev'));

app.use(express.static(__dirname + '/'));

app.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE');
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-access-token");
	next();
});

app.route('/login')
	.post(login);

app.route('/signup')
	.post(signup);

app.route('/books')
	.post(verifyAuth, postBook)
	.get(getBooks);

app.route('/books/:id')
	.get(getBook)
	.delete(verifyAuth, deleteBook);

app.route("*").get((req, res) => {
	res.send('一曲肝肠断，天涯何处觅知音！');
});

app.route("*").post((req, res) => {
	res.send('一曲肝肠断，天涯何处觅知音！');
});

app.listen(port);

console.log(`listening on port ${port}`);