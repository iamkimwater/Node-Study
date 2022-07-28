## **3. 노드 기능 알아보기**

### **노드 모듈시스템**
* 모듈화 : `module.exports = 값;`
* 변수 불러오기 : `const 변수 = require('파일경로');`
```javascript
// var.js 변수들을 func.js 에 불러오고 func.js 함수를 index.js에서 사용하기

// var.js
const odd = '홀수입니다';
const even = '짝수입니다';

module.exports = {   // 모듈화 
	odd,
	even,
};

// func.js
const { odd, even } = require('./var');

function checkOddOrEven(num) {
	if (num % 2) { // 홀수면
		return odd;
	}
	return even;
}

module.exports = checkOddOrEven;

// index.js
const { odd, even } = require('./var');
const checkNumber = require('./func');

function checkStringOddOrEven(str) {
	if (str.length % 2) { // 홀수면
		return odd;
	}
	return even;
}

console.log(checkNumber(10));
console.log(checkStringOddOrEven('hello'));
```

```javascript
// index.js 출력결과
짝수입니다
홀수입니다
```

<br>

### **global 객체**
```javascript
// 사용하지 않는 것을 권장함
```

<br>

### **console 객체**
* 객체 안에 디버깅을 도와주는 메서드 다수 존재
```javascript
const string = 'abc';
const number = 1;
const boolean = true;
const obj = {
  outside: {
    inside: {
      key: 'value',
    },
  },
};
console.log(process.argv);
console.time('전체시간');
console.log('평범한 로그입니다 쉼표로 구분해 여러 값을 찍을 수 있습니다');
console.log(string, number, boolean);
console.error('에러 메시지는 console.error에 담아주세요');

// 객체 전용 로그
// 매우 유용함 꼭 알아두기!!!
// colors, depth는 옵션
console.dir(obj, { colors: false, depth: 2 });
console.dir(obj, { colors: true, depth: 1 });

// 성능체크(인자 같아야 그 사이 시간을 체크함)
console.time('시간측정');
for (let i = 0; i < 100000; i++) {}
console.timeEnd('시간측정');

// 호출스택 추적
function b() {
  console.trace('에러 위치 추적');
}
function a() {
  b();
}
a();


console.timeEnd('전체시간');
```

<br>

### **setTimeout, setInterval, setImmediate**
* `setTimeout`, `setInterval`로 설정
* `clearTimeout`, `clearInterval`로 해제
* `setImmediate` : 함수를 이벤트루프로 보낼 때 사용

```javascript
// setTimeout, setInterval
const timeout = setTimeout(() => {
  console.log('1.5초 후 실행');
}, 1500);

const interval = setInterval(() => {
  console.log('1초마다 실행');
}, 1000);

const timeout2 = setTimeout(() => {
  console.log('실행되지 않습니다');
}, 3000);

setTimeout(() => {
  clearTimeout(timeout2);
  clearInterval(interval);
}, 2500);
```

```javascript
// setImmediate
const immediate = setImmediate(() => {
  console.log('즉시 실행');
});

const immediate2 = setImmediate(() => {
  console.log('실행되지 않습니다');
});

clearImmediate(immediate2);
```

<br>

### **__filename, __dirname**
* `__filename` : 현재 파일 경로
* `__dirname` : 현재 파일이 들어있는 경로
```javascript
console.log(__filename);
console.log(__dirname);
```

<br>

### **process 객체**
* 현재 실행중인 노드 프로그램 정보 들어있음
```
// Terminal
process.version   // 노드 버전
process.arch   // 프로세서의 아키텍처
process.platform   // 운영체제 정보
process.pid   // 현재 실행되고 있는 프로세스 id
process.uptime()   // 노드 실행된 지 얼마나 지났는지
process.cwd   // 프로세스 실행 위치
process.execPath   // 노드 설치된 경로
process.cpuUsage()   // 현재 cpu 사용량
process.exit   // 종료
```

```javascript
// process.exit 사용예시
// 꽤 많이 사용됨
// 에러 터졌을 때 서버 죽이고 다시 시작한다던지 등
for (ler i = 0; i < 100000; i++) {
	console.log(i);
	process.exit();
}

// 실행결과
0
```

<br>

### **os 모듈**
* 내장 모듈
* 운영체제 관련 모듈
```
// Terminal
const os = require('os')
os.arch()
os.platform
os.type()
os.uptime()
os.hostname()
os.release()
os.homedir()
os.tmpdir()
os.freemem()   // 추가적으로 사용가능한 메모리
os.totalmem()   // 전체 메모리
os.cpus()
```

<br>

### **path 모듈**
```
// Terminal
const path = require('path')
path.sep   // 디렉토리 구분자, 윈도우는 \\
path.delimiter   // 환경변수 구분자, 윈도우는 ;
...(정리필요)
```

<br>

### **url 모듈**
```javascript

```

<br>

### **querystring 모듈**
```javascript

```

<br>

### **crypto 단방향 암호화(해시)**
```javascript

```

<br>

### **crypto 양방향 암호화**
```javascript

```

### **util 모듈(deprecate, promisify)**
```javascript

```

### **fs 모듈(동기, 비동기)**
```javascript

```

### **버퍼, 스트림**
```javascript

```

### **.**
```javascript

```

### **기타 fs 메서드**
```javascript

```

### **event 모듈**
```javascript

```

### **예외처리하기**
```javascript

```