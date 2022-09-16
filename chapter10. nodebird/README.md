### **초기세팅**
* package.json 생성
	```
	npm init
	```

* pacake.json scripts에 추가
	```
	"start": "nodemon app"
	```

* 명령프롬프트에서 시퀄라이즈 명령어 사용할 수 있도록
	```
	npm i -g sequelize-cli
	```

* 시퀄라이즈, mysql 설치
	```
	npm i sequelize mysql2
	```

* 폴더들 생성
	```
	sequelize init
	```

* DB - 테이블 - 로우
	```javascript
	// DB : config/config.json

	"password":         ,   // 변경
	"database": "nodebird",
	.
	.
	"operatorsAliases": false,   // 경고메세지 없애기 위해 추가
	```
	```
	sequlize db:create
	```

* nodemon 설치 :  서버 코드가 바뀔 때 알아서 재시작
	```
	npm i -D nodemon

	// 명령프롬프트에 명령어로 사용하기 위해 전역설치도 해줌
	npm i -g nodemon
	```

* express, cookie-parser, express-session, morgan, connect-flash, pug 설치
	```
	npm i express cookie-parser express-session morgan connect-flash pug
	```

* app.js
	```javascript
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
	```