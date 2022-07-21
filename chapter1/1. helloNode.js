// Node란
// 가상머신으로 보아도 괜찮을 듯?
// JacaScript를 웹브라우저 바깥의 환경에서 구동되게 하는 프로그램

var a = 1;
var b = 2;
console.log(a + b);
console.log('hello node');

// 터미널에 node '파일명' 입력하면 실행됨 (자바스크립트 파일의 경우 확장자 생략해도 무방함)

// 호출스택
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
first();   // 실행순서 : 세 번째 > 두 번째 > 첫 번째


// 이벤트루프
function run() {
	console.log('3초 후 실행');
}
console.log('시작');
setTimeout(run, 3000);
console.log('끝');   // 실행순서 : 시작 > 끝 > 3초 후 실행


// 이벤트기반, 싱글쓰레드, 논블러킹 I/O
// 서버는 요청을 받아서 응답함
// 요청을 보내는 주체 : 클라이언트
// 서버도 클라이언트가 될 수 있음

// 논블로킹은 테스크큐로 보내는 동작
// I/O는
// 파일시스템 : 파일 읽고 쓰는 것 (사진 저장하고 불러오고 등등)
// 네트워크 : 네트워크 요청 보내고 받고 하는 것