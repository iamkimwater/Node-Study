## **6. express web server 만들기**

<br>

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
```
// L7
var app = require('../app');

// L15
var port = normalizePort(process.env.PORT || '3000');

// L22
var server = http.createServer(app);

// L28
server.listen(port);
```

<br>

#### **핵심로직** : `app.js`
```

```