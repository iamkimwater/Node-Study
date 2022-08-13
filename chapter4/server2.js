const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
	console.log('서버 실행');
  fs.readFile('./server2.html', (err, data) => {
    if (err) {
      throw err;
    }
    res.end(data);
  });
});
server.listen(8081);
server.on('listening', () => {
  console.log('8081번 포트에서 서버 대기중입니다!');
});
server.on('error', () => {
	console.error(error);
});