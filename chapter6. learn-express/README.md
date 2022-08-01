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
// 뒤에 템플릿엔진 pug 부분에서 더 상세히 다룸
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
```

* `app.use` : 모든 경우에 동작하는 미들웨어 장착 ( `.use`가 `app`에 미들웨어들 연결해 주는 메소드)

	- `app.use` 안에 들어가는 것들이 미들웨어(middleware)<br>
	- 미들웨어가 익스프레스의 핵심!!!<br>
	- 요청( `req` ) >>> 미들웨어들( `app.use` ) >>> 응답( `res` )<br>
	- `app.use` 안의 `req`, `res`로 요청, 응답 조작<br>
	- 미들웨어에서는 (1) `next`로 다음 미들웨어로 넘어가거나 (2) `res.send` 등으로 응답 보냄<br>
	- next도, res 메소드도 사용하지 않으면 클라이언트는 계속 기다림 (무한로딩, 실제로는 timeout 될때까지)

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

// 라우터들
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

	- GET, POST, DEL 요청들에만 걸리는 미들웨어 (라우팅 미들웨어)를 장착

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

	- `morgan` : 어떤 요청이 들어왔는지, 어떤 응답을 했는지<br>
	- `body-parser` : 요청 본문 해석 ( req.on('data'), req.on('end') ), express 4.16부터 내장<br>
	- `cookie-parser` : 쿠키 파싱<br>
	- `static` : 정적파일용 라우터 역할, 못 찾으면 next<br>
	- `express-session` : 메모리세션 활성화<br>
	- `flash` : 일회성 메세지 띄워줌<br>

```
// Terminal
npm i express-session connect-flash
```

```javascript
// 미들웨어 순서 예시
// passport는 session보다 아래에 있어야 동작
// 순서 뒤집히면 에러남
app.use(session());
app.use(passport.session());
```

```javascript
// L20 : static 미들웨어
// public 폴더 안에 있는 파일들 가져오기
// public 폴더 안에 원하는 파일 없을 때에만 next
// 원하는 파일 찾으면 next 호출하지 않고 중단 -> 불필요한 서버 작동 방지
// 보통 logger 다음 최우선순위로 배치
app.use(express.static(path.join(__dirname, 'public')));
```

```javascript
const session = {

};

// 프론트가 서버로 쿠키 보내주면 secret code로 확인
app.use(cookieParser('secret code'));

// session 미들웨어
// 옵션 추가 가능
app.use(session({   // 내부적으로 쿠키 사용하므로 secret code 넣어줌
	resave: false,   // true -> session 객체 저장 (수정사항 없어도)
	saveUninitialized: false,   // true -> session 객체 업데이트 (빈 객체 또는 수정사항 없어도)
	secret: 'secret code',   // 쿠키의 secret
	cookie: {
		httpOnly: true,
		secure: false,
	},
}));
```

* 미들웨어의 특징

	- `next`로 다음 미들웨어로 넘어가거나 `res.send` 등으로 응답 보냄<br>
	- next도, res 메소드도 사용하지 않으면 클라이언트는 계속 기다림 (무한로딩, 실제로는 timeout 될때까지)<br>
	- 미들웨어들 한 줄로 연결 가능<br>

```javascript
// 미들웨어들 한 줄 연결
// app.use(미들웨어, 미들웨어, 미들웨어, ...);
// app.get(미들웨어, 미들웨어, 미들웨어, ...);
// app.post(미들웨어, 미들웨어, 미들웨어, ...);
// app.put(미들웨어, 미들웨어, 미들웨어, ...);
// ...
app.use(logger('dev'), express.static(path.join(__dirname, 'public')), express.json(), express.urlencoded({ extended: false }), cookieParser());
```

* 라우터 분리

	- app.js 에서 분리 (가독성을 위해)
	- routes 폴더에 라우터들 따로 모여있음
	- 경로
		- `app.use('/abc')` + `router.get('/df')` = `GET/abc/df`
		- `app.use('/')` + `router.post('/')` = `POST//` = `POST/`

```javascript
// L7 ~ L8
// 경로에서 index 생략가능 -> const indexRouter = require('./routes');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

// L22 ~ L23
app.use('/', indexRouter);
app.use('/users', usersRouter);
```

* 404 NOT FOUND 미들웨어

	- 미들웨어와 라우터들 다음에 위치 -> 모든 라우터에 요청이 걸리지 않는 상황을 처리
	- <참고> 400번대 에러는 클라이언트에서 에러가 발생한 경우

```javascript
// http-errors 패키지 이용해서 처리
const createError = require('http-errors');   // L1

// catch 404 and forward to error handler (404처리 미들웨어)   // L25 ~ L28
app.use(function(req, res, next) {
  next(createError(404));
});

// 다른 표현
// express에서는 writeHead(404)대신 status(404)사용
app.use((req, res, next) => {
	res.status(404).send('NOT FOUND');
});
```

* 500 에러 처리 미들웨어

	- 파라미터로 `err` 포함
	- 미들웨어와 라우터들 다음에 위치
	- <참고> 500번대 에러는 서버쪽 에러가 발생한 경우

```javascript
// L30 ~ L39
// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// 다른 표현
app.use(function(err, req, res, next) {
	res.status(500).send('SERVER ERROR');
});
```

* <추가> 에러 처리

	- `next(error)` : 다음 미들웨어, 라우터 전부 건너뛰고 에러처리 미들웨어로 이동

<br>

<details>
<summary><보너스코드> if문 활용한 50% 확률로 실행되는 코드</summary>
<br>

* if문 활용해서 `next()` 조정 -> 서버의 요청 - 응답 흐름 조정 가능

```javascript
// 50% 확률로
app.use((req, res, next) => {
	console.log('첫 번째 미들웨어');
	if (+new Date() % 2 === 0 {
	next();   // 실행되거나 -> '두 번째 미들웨어' 또는 그 다음으로 넘어감
	} else {
		res.send('50% 당첨');   // 실행됨 -> '두 번째 미들웨어' 실행되지 않음
	}
}, (req, res, next) => {
	console.log('두 번째 미들웨어');
	next();
});
```

</details>

<br>

* 템플릿 엔진 : html 한계 (변수, 조건문, 반복문 등 사용 불가) 극복하기 위해 나온 언어

	- PUG
		- pug 파일은 views 폴더에 모여있음
		- 문법
			- 속성은 () 안에
			- div 생략 가능
			- 태그 (한 칸 띄고) 내용 작성
			- id는 #
			- class는 .
			- 중복되는 부분은 include, layout으로 해결


```
// 초기 설정 : html 대신 템플릿 엔진으로 pug를 사용하겠다는 의미

express 폴더명 --view=pug
```

```javascript
// L12 ~ L14
// view engine setup
app.set('views', path.join(__dirname, 'views'));   // pug파일은 views폴더에 있음
app.set('view engine', 'pug');   // 뷰 엔진으로 pug 사용
```

```pug
// views 폴더에 test.pug 추가

// 원래 html 형태
// <!DOCTYPE html> 
// <html>
// <head>
// <title>익스프레스</title>
// <link rel="stylesheet" href="/stylesheet/style.css">
// </head>
// </html>

// pug 문법 사용
// pug는 들여쓰기로 부모 자식 태그를 구분
// 들여쓰기는 탭, 스페이스 모두 가능하지만 반드시 하나로 통일해야 함
// 들여쓰기 잘못하면 렌더링 에러가 나므로 주의해서 작성해야 함

doctype html 
html
 head
  -const title = '익스프레스'   // 하이픈 뒤 변수 선언 (app.js에서도 선언 가능)
  -const title2 = '안녕'
  title= title + ' ' + title2   // 등호 뒤에 변수 사용
  link (rel='stylesheet' href='/stylesheet/style.css')   // 속성은 () 안에
  style.
   p {
    color: red;
   }
  
 body
  #kimwater(width=500)
	// div(id="kimwater" width=500)
  // div#kimwater(width=500)   // id #
  // <div id="kimwater" width="500"></div> 로 렌더링
  
  span(class='express')
  // span.express   // class .
  // <span class="express"></span> 로 렌더링
  
  // 조건문
  if variable
   div 참입니다.
  else 
   div 거짓입니다.
  
  // 반복문
  for i in ['사과', '배', '오렌지']
   div= i
  
  p 
   | 안녕하세요.
   | 여러 줄을 입력합니다.
   br
   | 태그도 중간에 넣을 수 있어요.
   // <p>안녕하세요. 여러 줄을 입력합니다. <br /> 태그도 중간에 넣을 수 있어요.</p> 로 렌더링
  
  script.
   var message = 'bug';
   alert(message);
```

```javascript
// app.js
// pug 파일 가져오기
res.render('test', {   // test.pug를 html로 렌더링
 title: '익스프레스',   // render 메소드 두 번째 인자로 변수 선언 가능
 title2: '안녕',
});


// <참고> 렌더링 : 개발자가 작성한 코드를 유저에게 보여지는 형태로 보여주는 것
// render() : 첫 번째 인자는 템플릿, 두 번째 인자는 템플릿에 추가할 정보가 담긴 객체
```

```pug
// 중복되는 부분 처리하는 방법

// test2.pug 파일 생성
// header.pug, footer.pug 파일 생성
// layout.pug 파일 작성
// extends layout.pug
```
```pug
// test.pug
extends layout.pug 

block content 
 #kimwater(width=500) 

 span.express 

 button(type='submit') 전송 

 if variable
  div 참입니다.
 else 
  div 거짓입니다. 

 for i in ['사과', '배', '오렌지']
  div= i 

 p 
  | 안녕하세요.
  | 여러 줄을 입력합니다.
  br
  | 태그도 중간에 넣을 수 있어요.

block script
 script.
  var message = 'bug';
  alert(message);
```
```pug
// test2.pug
extends layout.pug

block content
 #main 본문입니다.
```
```pug
// header.pug
#header
 span 헤더입니다.
```
```pug
// footer.pug
#footer
 span 푸터입니다.
```
```pug
// layout.pug
doctype html 
html
 head
  -const variable = true
  -const title = '익스프레스'
  -const title2 = '안녕'
  title= title + ' ' + title2
  link (rel='stylesheet' href='/stylesheet/style.css')
  style.
   p {
    color: red;
   }
 
 body
  include header
  block content   // block : 바뀌는 부분
  include footer
  block.script 
   script.   // script block 의 기본값
   console.log('hi')
```

* *  EJS
		* 변수 : `<%= 변수 %>` 형태
		* 반복문 : `<% for (i in [...]) { %>` ... `<% } %>` 형태, % 뒤에 등호 없음 주의
		* 조건문 : `<% if (...) { %>` ... `<% } else { %>` ... `<% } %>` 형태, % 뒤에 등호 없음 주의

```ejs
// index.ejs
<!DOCTYPE html>
<html>
 <head>
  <title><%= title %></title>
  <link rel='stylesheet' href='/stylesheets/style.css' />
 </head>
 <body>
  <h1><%= title %></h1>
	<% for (i in fruits) { %>   // in : 키 출력
  // <% for (i of fruits) { %>   // of : 값 출력
  <p>Welcome to <%= i %></p>
	<% } %>
	<% if (title === 'ejs') { %>
	 <p>ejs 공부합시다.</p>
	<% } else { %>
	 <p>pug 공부합시다.</p>
	<% } %>
 </body>
</html>


// routes/index.js
const express = require('express');
const router = express.Router();

router.get('/', function(req, res, next) {
	res.render('index', { title: 'ejs' , fruits: ['사과', '배', '오렌지'] });
});

module.exports = router;
```