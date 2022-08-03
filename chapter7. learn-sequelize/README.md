## **7. My SQL, sequelize**

### **개념**
* SQL (Structured Query Language)
	- 관계형 DB시스템에서 자료를 관리 및 처리하기 위해 설계된 구조적 데이터 질의 언어
	- 에스큐엘 혹은 쿼리 라고 부름
	- 예시 (CRUD)
		- Create 생성
		- Read 조회
		- Update 수정
		- Delete 삭제
	- [추가정보 : 출처 '365kim 티스토리'](https://365kim.tistory.com/102)
		> SQL은 'Structured Query Language'의 약자이다. 이때 'Structured'는 데이터가 표로 정리되어 구조화되어있다는 뜻이고, 'Query'는 사용자가 데이터베이스에게 '데이터를 넣어줘, 삭제해줘, 수정해줘, 읽어줘' 등의 요청을 할 수 있다는 뜻이며, 'Language'는 데이터베이스도 이해할 수 있고 사용자도 이해할 수 있는 언어로 요청한다는 뜻이다.

* Sequelize
	- DB 작업을 쉽게 할 수 있도록 도와주는 라이브러리
	- ORM (Object-relational Mapping)
	- 자바스크립트 객체와 관계형 DB를 연결

### **초기설정**
```
// Terminal
express learn-sequelize --views=pug
cd learn-sequelize
npm i

npm i sequelize mysql2
npm i -g sequelize-cli   // cli : command-line interface
sequelize init
```

<br>

### **models/index.js**
```javascript
const path = require('path');
const Sequelize = require('sequelize');

const env = process.env.NODE_ENV || 'development';   // 배포용 : 'production'
const config = require('../config/config.json')   // sequelize에 대한 설정파일

const db = {};
```

### **config/config.json** : sequelize에 대한 설정파일
```javascript
{
	// 개발 환경일 때
  "development": {         // DB 설정
    "username": "root",   // DB id
    "password": null,    // DB password
    "database": "database_development",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
	// 테스트 환경일 때
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
	// 배포 환경일 때
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}
```