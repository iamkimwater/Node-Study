// 기본형태
/*
const http = require('http');

http.createServer((req, res) => {
  // 여기에 어떻게 응답할 지 적어줍니다.
});
*/



const http = require('http');

http.createServer((req, res) => {
  res.write('<h1>Hello Node!</h1>');
	res.write('<h2>Hello JS!</h2>');
	res.write('<h2>Hello JS!</h2>');
	res.write('<h2>Hello JS!</h2>');
  res.end('<p>Hello Server!</p>');
}).listen(8080, () => {   // 포트 번호를 적어줘야 함 (기본포트 생략가능: http는 80, https는 443)
  console.log('8080번 포트에서 서버 대기중입니다!');
});

// 포트가 다르면 호스트가 같더라도 다른 사이트처럼 동작할 수 있음
// 보통 프로그래밍할 때 8080포트 많이 사용
// 1024 아래 포트는 다른 프로그램이 사용 중일 확률 높음
// 다른 프로그램이 이미 사용 중인 포트를 사용하면 에러 발생
