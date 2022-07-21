const http = require('http');
const fs = require('fs');

const users = {};   // DB 대신 메모리(DB 아직 안 배워서...), 서버 재시작 하면 날라감

http.createServer((req, res) => {   // creatServer: 방문에 대한 이벤트리스너 역할
	// GET
  if (req.method === 'GET') {
    if (req.url === '/') {
      return fs.readFile('./restFront.html', (err, data) => {   // 프론트로 버퍼들 보내짐
        if (err) {   // 에러처리 해주고
          throw err;
        }
        res.end(data);
      });
    } else if (req.url === '/about') {
      return fs.readFile('./about.html', (err, data) => {
        if (err) {
          throw err;
        }
        res.end(data);
      });
    } else if (req.url === '/users') {
      return res.end(JSON.stringify(users));   // 객체형식으로 보낼 수 없음 >>> JSON 문자열로 감싸서 보냄
    }
    return fs.readFile(`.${req.url}`, (err, data) => {   // 주소가 루트, about, users가 아니면 요청한 url과 이름이 같은 정적 파일을 보냄
      if (err) {
        res.writeHead(404, 'NOT FOUND');
        return res.end('NOT FOUND');
      }
      return res.end(data);
    });

	// POST: Ajax를 통한 요청
	// Ajax란? : 'A-to-Z' 레포에 정리'
  } else if (req.method === 'POST') {
    if (req.url === '/users') {
      let body = '';
      req.on('data', (data) => {
        body += data;
      });
      return req.on('end', () => {
        console.log('POST 본문(Body):', body);
        const { name } = JSON.parse(body); 
        const id = Date.now();
        users[id] = name;
        res.writeHead(201);
        res.end('등록 성공');
      });
    }
	
	// PUT
  } else if (req.method === 'PUT') {
    if (req.url.startsWith('/users/')) {
      const key = req.url.split('/')[2];
      let body = '';
      req.on('data', (data) => {
        body += data;
      });
      return req.on('end', () => {
        console.log('PUT 본문(Body):', body);
        users[key] = JSON.parse(body).name;
        return res.end(JSON.stringify(users));
      });
    }
	
	// DELETE
  } else if (req.method === 'DELETE') {
    if (req.url.startsWith('/users/')) {
      const key = req.url.split('/')[2];
      delete users[key];
      return res.end(JSON.stringify(users));
    }
  }
  res.writeHead(404, 'NOT FOUND');
  return res.end('NOT FOUND');
})
  .listen(8005, () => {   // listen: 프로그램이 종료되지 않고 유지되게 하는 장치
    console.log('8085번 포트에서 서버 대기중입니다');
  });