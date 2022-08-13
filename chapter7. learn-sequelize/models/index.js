// path 모듈, Sequelize 패키지 불러오기
const path = require('path');
const Sequelize = require('sequelize');

// Sequelize 패키지에 대한 설정 config로 불러오기 (개발환경)
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config.json')[env];

// Sequelize 패키지를 불러온 설정 넣어서 인스턴스화 시킴
// new 연산자 + Sequelize 생성자 -> sequelize 인스턴스 생성
const sequelize = new Sequelize(config.database, config.username, config.password, config);

// db 객체 생성
const db = {};

// db에 Sequelize 패키지, sequelize 인스턴스 넣어보기
db.Sequelize = sequelize;
db.sequelize = sequelize;

db.User = require('./user')(sequelize, Sequelize);
db.Comment = require('./comment')(sequelize, Sequelize);

// MySQL과 같은 관계형 DB는 테이블 간 관계가 중요함
// user와 commenter의 관계 작성
// foreignKey: 두 테이블을 연결하는 데 사용되는 키
db.User.hasMany(db.Comment, { foreignKey: 'commenter', sourceKey: 'id' });
db.Comment.belongsTo(db.User, { foreignKey: 'commenter', targetKey: 'id' });   // 대소문자 주의.. BelongsTo 앞을 대문자로 써서 에러남!!!

// 참고
// 1:1 -> hasOne, belongsTo
// 1:다 -> hasMany, belongsTo
// 다:다 -> belongsToMany, belongsToMany

// db 객체 모듈화
module.exports = db;
