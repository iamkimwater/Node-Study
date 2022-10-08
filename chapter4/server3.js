const http = require('http');

const parseCookies = (cookie = '') =>
  cookie
    .split(';')
    .map(v => v.split('='))
    .reduce((acc, [k, v]) => {
      acc[k.trim()] = decodeURIComponent(v);
      return acc;
    }, {});

const server = http.createServer((req, res) => {
	console.log(req.url, parseCookies(req.headers.cookie));   // 서버에서 쿠키 받기
  res.writeHead(200, { 'Set-Cookie': 'mycookie=test' });   // 쿠키 설정
	res.end('Hello Cookie');
}).listen(8082);
server.on('listening', () => {
  console.log('8082번 포트에서 서버 대기중입니다.');
});
server.on('error', (error) => {
	console.error(error);
});

// key=value; path=경로; expires=만료날짜; domain=도메인; secure; httpOnly
// 요청이나 응답에는 그에 대한 정보를 담고 있는 헤더가 포함되어 있음
// Request Header의 Cookie: 클라이언트가 서버에 요청을 보낼 때 같이 보내는 쿠키 