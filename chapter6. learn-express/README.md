## **6. express web server 만들기**

### **초기설정(Terminal)**
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

### **서버실행부** : bin/www
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

### **핵심로직(중앙통제실)** : app.js
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
// L13 ~ 14
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
```

* `app.use` : 모든 경우에 동작하는 미들웨어 장착 ( `.use`가 `app`에 미들웨어들 연결해 주는 메소드)

	> `app.use` 안에 들어가는 것들이 미들웨어(middleware)<br>
	> 미들웨어가 익스프레스의 핵심!!!<br>
	> 요청( `req` ) >>> 미들웨어들( `app.use` ) >>> 응답( `res` )<br>
	> `app.use` 안의 `req`, `res`로 요청, 응답 조작<br>
	> 미들웨어에서는 (1) `next`로 다음 미들웨어로 넘어가거나 (2) `res.send` 등으로 응답 보냄

```javascript
// L16 ~ L23
// next 없어도 다음 미들웨어로 넘어감
const logger = () => (req, res, next) => {
	next();
}
// logger 형태가 위와 같으므로 (next 포함)

	app.use(logger('dev'));
	app.use(express.json());
	app.use(express.urlencoded({ extended: false }));
	app.use(cookieParser());
	app.use(express.static(path.join(__dirname, 'public')));

	app.use('/', indexRouter);
	app.use('/users', usersRouter);

// L25 ~ L39
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

* <참고> `app.get`, `app.post`, `app.delete` : 특수한 경우에만 동작하는 미들웨어 (라우팅 미들웨어) 장착

	> GET, POST, DEL 요청들에만 걸리는 미들웨어 (라우팅 미들웨어)를 장착

```javascript
// GET 요청에만 걸리는 미들웨어 장착
// http 요청할 때 '/' 주소와 일치할 때만 동작
app.get('/', (req, res) => {

});

// POST 요청에만 걸리는 미들웨어 장착
// http 요청할 때 '/' 주소와 일치할 때만 동작
app.post('/', (req, res) => {
	
});

// DELETE 요청에만 걸리는 미들웨어 장착
// http 요청할 때 '/users' 주소와 일치할 때만 동작
app.delete('/users', (req, res) => {
	
});

// 이 외에 app.options ...
```

* 유명한 미들웨어들 (미들웨어들 순서 중요!!!)

	> `morgan` : 어떤 요청이 들어왔는지, 어떤 응답을 했는지<br>
	> `body-parser` : 요청 본문 해석 ( req.on('data'), req.on('end') ), express 4.16부터 내장<br>
	> `cookie-parser` : 쿠키 파싱<br>
	> `static` : 정적파일용 라우터 역할, 못 찾으면 next<br>
	> `express-session` : 메모리세션 활성화<br>
	> `flash` : <br>

```
// terminal
npm i express-session connect-flash
```

```javascript
// 미들웨어 순서 예시
// passport는 session보다 아래에 있어야 동작
// 순서 뒤집히면 에러남
app.use(session());
app.use(passport.session());

// L20 : static
// public 폴더 안에 있는 파일들 가져오기
// public 폴더 안에 원하는 파일 없을 때에만 next
// 원하는 파일 찾으면 next 호출하지 않고 중단 -> 불필요한 서버 작동 방지
// 보통 logger 다음 최우선순위로 배치
app.use(express.static(path.join(__dirname, 'public')));

// session
// 옵션 추가 가능
app.use(session({
	resave: false,
	saveUninitialized: false,
	secret: 'secret code',   // 쿠키의 secret -> cokie-parser에도 추가해줌 
							// app.use(cookieParser('secret code'));
	cookie: {
		httpOnly: true,
		secure: false,
	},
}));
```