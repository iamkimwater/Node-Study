const { DataTypes } = require("sequelize/types");
const { sequelize } = require(".");

// 댓글 테이블 생성
// 컬럼: 작성자, 댓글내용, 생성일
module.exports = (sequelize, DataTypes) => {
	return sequelize.define('comment', {
		commenter: {

		},
		comment: {

		},
		created_at: {

		}
	}, {
		timestamps: false,
		underscored: true,
	});
};