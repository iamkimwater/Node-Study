const { DataTypes } = require("sequelize/types");
const { sequelize } = require(".");

// 유저 테이블 생성
// 이름, 나이, 결혼여부, 댓글, 생성일
module.exports = (sequelize, DataTypes) => {
	// 테이블 이름(user), 테이블 내용
	return sequelize.define('user', {

	});
};