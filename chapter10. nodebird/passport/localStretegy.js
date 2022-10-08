const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

const { User } = require('../models');

module.exports = (passport) => {
  passport.use(new LocalStrategy({
		// urlencoded 미들웨어가 req.body값들 해석
		// body에서 이메일과 패스워드를 받아서 일치하는지 체크
    usernameField: 'email',   // req.body.email
    passwordField: 'password',   // req.body.password
  }, async (email, password, done) => {   // done(에러, 성공, 실패)
    try {
			// 이메일 있는지 검사
      const exUser = await User.findOne({ where: { email } });
      if (exUser) {
        const result = await bcrypt.compare(password, exUser.password);
        if (result) {
          done(null, exUser);   // 성공
        } else {
          done(null, false, { message: '비밀번호가 일치하지 않습니다.' });   // 실패정보
        }
      } else {
        done(null, false, { message: '가입되지 않은 회원입니다.' });  // 실패정보
      }
    } catch (error) {
      console.error(error);
      done(error);   // 서버에러인가?
    }
  }));
};

// done(서버에러)
// done(null, 사용자정보)
// done(null, false, 실패정보)