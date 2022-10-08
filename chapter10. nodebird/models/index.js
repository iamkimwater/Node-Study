const Sequelize = require('sequelize');
const env = process.env.NODE.ENV || 'development';
const config = require('../config/config')[env];
const db = {};

const sequelize = new Sequelize(
	config.database, config.username, config.password, config,
);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.User = require('./user')(sequelize, Sequelize);
db.Post = require('./post')(sequelize, Sequelize);
db.Hashtag = require('./hashtag')(sequelize, Sequelize);

// 일대일 관계
// db.User.hasOne(db.Post);
// db.Post.belongsTo(db.User);

// 일대다 관계
db.User.hasMany(db.Post);
db.Post.belongsTo(db.User);

// 다대다 관계
db.Post.belongsToMany(db.Hashtag, { through: 'PostHashtag' });   // through: '새로운 모델'
db.Hashtag.belongsToMany(db.Post, { through: 'PostHashtag' });

db.User.belongsToMany(db.User, { through: 'Follow', as: 'Followers', foreignKey: 'FollowingId' });   // foreignKey: '상대 테이블 아이디'
db.User.belongsToMany(db.User, { through: 'Follow', as: 'Following', foreignKey: 'FollowerId' });

db.User.belongsToMany(db.Post, { through: 'Like' });
db.Post.belongsToMany(db.User, { through: 'Like' });

module.exports = db;
