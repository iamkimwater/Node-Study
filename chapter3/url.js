const url = require('url');

const { URL } = url;
const myURL = new URL('http://www.gilbut.co.kr/book/bookList.aspx?sercate1=001001000#anchor');
console.log('new URL():', myURL);
console.log('url.format():', url.format(myURL));
console.log('------------------------------');
const parsedUrl = url.parse('http://www.gilbut.co.kr/book/bookList.aspx?sercate1=001001000#anchor');
console.log('url.parse():', parsedUrl);
console.log('url.format():', url.format(parsedUrl));


// 기존 방식의 주소 체계(url.parse)

// protocol             auth                hostname      port    pathname         query        hash
//   http:   //    user   :   pass    @  sub.host.com  :  8080 /  p/a/t/h   ?  query=string  #  hash
// protocol      username   password        hostname      port    pathname         search       hash

// WHATWG 방식의 주소 체계(url.URL)
