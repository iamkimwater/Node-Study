const express = require('express');
const morgan = require('morgan');
const path = require('path');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const flash = require('flash');

const app = express();

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
app.set('port', process.env.PORT || 8001);

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(espress.urlencoded({ extended: false }));
app.use(cookieParser('nodebirdsecret'));
app.use(session({
	resave: false,
	saveUninitialized: false,
	secret: 'nodebirdsecret',
	cookie: {
		httpOnly: true,
		secure: false,
	},
}));
app.use(flash());

app.listen(app.get('port'), () => {
	console.log(`${app.get('port')}번 포트에서 서버 실행중입니다.`);
});