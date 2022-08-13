// const { DataTypes } = require("sequelize/types");
// const { sequelize } = require(".");

// 댓글 테이블 생성
// 컬럼: 작성자(id 넘버), 댓글내용, 생성일
module.exports = (sequelize, DataTypes) => {
	return sequelize.define('comment', {
		// commenter는 user와 관계있는 데이터이므로 index.js에 관계를 작성
		// commenter: {
		// 	type: DataTypes.STRING(20),
		// 	allowNull: false,
		// 	unique: true,
		// },
		comment: {
			type: DataTypes.STRING(100),
			allowNull: false,
		},
		created_at: {
			type: DataTypes.DATE,
			allowNull: false,
			defaultValue: sequelize.literal('now()'),
		}
	}, {
		timestamps: false,
		underscored: true,
	});
};