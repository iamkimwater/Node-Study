# <p align=center>**Node.js-Study**</p>
## <p align=center>**Node.js 에 대해 공부한 기록을 담은 공간입니다.**</p>

<!-- <p align="center">
	<img src="https://user-images.githubusercontent.com/97582839/178905523-9e563c52-0380-4ea5-8fab-1d01b2765ff8.jpg" width="100%">
</p> -->

<br>

<details>
<summary>Node</summary>

- #### 가상머신으로 보아도 괜찮을 듯?
- #### JacaScript를 웹브라우저 바깥의 환경에서 구동되게 하는 프로그램
- #### 터미널에 node '파일명' 입력하면 실행됨 (자바스크립트 파일의 경우 확장자 생략해도 무방함)

```javascript
var a = 1;
var b = 2;
console.log(a + b);
console.log('hello node');

// 실행결과
3
hello node
```

</details>



<details>
<summary>콜스택</summary>

```javascript
function first() {
	second();
	console.log('첫 번째');
}
function second() {
	third();
	console.log('두 번째');
}
function third() {
	console.log('세 번째');
}
first();

// 실행결과
세 번째
두 번째
첫 번째
```

</details>



<details>
<summary>이벤트루프</summary>

- #### 여러 개의 태스크큐에서 함수를 순서대로 꺼내오는 역할

```javascript
function run() {
	console.log('3초 후 실행');
}
console.log('시작');
setTimeout(run, 3000);
console.log('끝');

// 실행결과
시작
끝
3초 후 실행
```

#### 언제 태스크큐에 들어감?
> `setTimeout` `setInterval` `setImmediate`<br>`Promise.resolve` `Promise.reject`<br>`async` `await` `EventListener`

<br>

참고 : [Node.js 공식문서](https://nodejs.org/ko/docs/guides/event-loop-timers-and-nexttick/)
</details>



<details>
<summary>이벤트드리븐, 논블로킹 I/O, 싱글/멀티스레드</summary>

정리필요

</details>



<details>
<summary>ES2018</summary>

- #### 변수선언방식 변화 : `var` >>> `const`, `let` 
	> const, let은 블럭({}) 스코프 : 블럭 밖에서 접근 불가

	#### `var`

	```javascript
	if(true) {
		var x = 3;
	}
	console.log(x);

	// 실행결과
	3
	```

	#### `const`
	
	```javascript
	if(true) {
		const y = 3;
	}
	console.log(y);

	// 실행결과 에러출력
	ReferenceError: y is not defined
	```

- #### `const`와 `let`의 차이

	#### `const`
	> 값 재할당 불가

	```javascript
	const a = 0;
	a = 1;

	// 실행결과 에러출력
	TypeError: Assignment to constant variable.
	```

	#### `let`
	> 값 재할당 가능

	```javascript
	let b = 0;
	b = 1;

	// 실행결과
	1
	```
</details>



<details>
<summary>.</summary>

```javascript

```

</details>