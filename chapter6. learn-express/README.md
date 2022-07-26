## **6. express web server 만들기**

#### **초기설정(Terminal)**
```
// express-generator 설치
npm i -g express-generator

// 폴더 템플릿 생성
express 폴더명 --view=pug

// 폴더로 이동해서 package.json dependencies 설치
cd 폴더명
npm i

// 서버 시작
npm start
```

<br>

#### **서버실행부** : bin/www
```javascript
// L7 : app 모듈 가져오기
const app = require('../app');

// L15
const port = normalizePort(process.env.PORT || '3000');

// L22
const server = http.createServer(app);   // creatServer에 app이라는 콜백함수 넣음

// L28
server.listen(port);   // port 리스닝하고 있음
```

<br>

#### **핵심로직(중앙통제실)** : app.js
* express 프레임워크를 이용해서 서버를 만드는 방법 (초간단버전)
```javascript
// L2 : express 패키지 가져오기
const express = require('express');

// L10 : app 객체 생성
const app = express();

// 초간단버전을 위한 코드삽입 (실제 app.js와 다름)
app.get('/', (req, res) => {
	res.send('Hello express');
});

// 라우터 하나씩 추가
app.get('/users', (req, res) => {
	res.send('Hello users');
	// end가 아니라 send
	// express에서 response객체에 send메소드를 추가한 것
});

// L41 : app 객체를 모듈로 만들어서 내보내기
module.exports = app;
```

* `app.set` : express 설정 또는 값 저장 (값 저장은 나중에 사용)
```javascript
// L13 - 14
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
```

* `app.use` : 미들웨어 장착

	> app.use 안에 들어가는 것들이 미들웨어(middleware)<br>
	> 미들웨어가 익스프레스의 핵심!!!
```javascript
// L16 ~ L39
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler (404처리 미들웨어)
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
```

