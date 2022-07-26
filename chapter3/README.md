## **3. 노드 기능 알아보기**

#### **노드 모듈시스템**
* **모듈화** : `module.exports = 값;`
* **변수 불러오기** : `const 변수 = require('파일경로');`
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

#### **global 객체**
```javascript
// 사용하지 않는 것을 권장함
```

<br>

#### **console 객체**
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

#### **setTimeout, setInterval, setImmediate**
* setTimeout, setInterval로 설정
* clearTimeout, clearInterval로 해제
* setImmediate : 함수를 이벤트루프로 보낼 때 사용

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

#### **__filename, __dirname, process**
```javascript

```

<br>

#### **os 모듈**
```javascript

```

<br>

#### **path 모듈**
```javascript

```

<br>

#### **url 모듈**
```javascript

```

<br>

#### **querystring 모듈**
```javascript

```

<br>

#### **crypto 단방향 암호화(해시)**
```javascript

```

<br>

#### **crypto 양방향 암호화**
```javascript

```

#### **util 모듈(deprecate, promisify)**
```javascript

```

#### **fs 모듈(동기, 비동기)**
```javascript

```

#### **버퍼, 스트림**
```javascript

```

#### **.**
```javascript

```

#### **기타 fs 메서드**
```javascript

```

#### **event 모듈**
```javascript

```

#### **예외처리하기**
```javascript

```