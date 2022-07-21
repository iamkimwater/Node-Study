// ES(ECMA Script) : 표준
// JavaScript : ES를 구현

// 변수선언 방식 바뀜 : const, let

// if(true) {
// 	var x = 3;
// }
// console.log(x);


// 에러뜸 : const, let 블록스코프
// if (true) {
// 	const y = 3;
// }
// console.log(y);


// 에러뜸 : const는 값 재할당 불가
// const a = 0;
// a = 1;

// let은 값 재할당 가능
// let b = 0;
// b = 1;
// b;

const a = 1;
const b = 2;
let c = 3;
c = 4;
a + b + c;