import express from 'express'
import session from 'express-session'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import morgan from 'morgan'

const RedisStore = require('connect-redis')(session);

import { picture,rePicture } from './routes/index';

const secret = 'captcha';

const port = process.env.PORT || 5000;
const app = express()

// bodyParser morgan
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());
app.use(morgan('dev'));

app.use(express.static(__dirname + '/client/dist'));

app.use(cookieParser(secret));
app.use(session({
  store: new RedisStore({
    host: '127.0.0.1',
    port: 6379,
    pass: ''
  }),
  cookie: {maxAge: 5*60*1000 },
  resave: true,
  saveUninitialized: true,
  secret: secret
}));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.route('/captcha')
  .get(picture);

app.route('/recaptcha')
  .post(rePicture);
 
app.listen(port);

console.log(`listening on port ${port}`);
