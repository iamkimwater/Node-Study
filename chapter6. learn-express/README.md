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

#### **서버실행부** : bin/ `www`
```javascript
// L7 : app 모듈 가져오기
var app = require('../app');

// L15
var port = normalizePort(process.env.PORT || '3000');

// L22
var server = http.createServer(app);   // creatServer에 app이라는 콜백함수 넣음

// L28
server.listen(port);   // port 리스닝하고 있음
```

<br>

#### **핵심로직** : `app.js`
* express 프레임워크를 이용해서 서버를 만드는 방법 (초간단버전)
```javascript
// L2 : express 패키지 가져오기
var express = require('express');

// L10 : app 객체 생성
var app = express();

// 초간단버전을 위한 코드삽입 (실제 app.js와 다름)
app.get('/', (req, res) => {
	res.send('Hello express');
});

// 라우터 하나씩 추가
app.get('/users', (req, res) => {
	res.send('Hello users');
});

// L41 : app 객체를 모듈로 만들어서 내보내기
module.exports = app;
```