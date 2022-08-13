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
	// req.headers.cookie
  res.writeHead(200, { 'Set-Cookie': 'mycookie=test' });
	res.end('Hello Cookie');
}).listen(8082);
server.on('listening', () => {
  console.log('8082번 포트에서 서버 대기중입니다.');
});
server.on('error', (error) => {
	console.error(error);
});

// key=value; path=경로; expires=만료날짜; domain=도메인; secure; httpOnly