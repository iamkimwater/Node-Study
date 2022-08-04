const { DataTypes } = require("sequelize/types");
const { sequelize } = require(".");

// user 테이블 생성
module.exports = (sequelize, DataTypes) => {
	return sequelize.define('user', {

	});
};