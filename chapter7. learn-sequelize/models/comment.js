const { DataTypes } = require("sequelize/types");
const { sequelize } = require(".");

// 댓글 테이블 생성
module.exports = (sequelize, DataTypes) => {
	return sequelize.define('comment', {

	});
};