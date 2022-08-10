const { DataTypes } = require("sequelize/types");
const { sequelize } = require(".");

// 유저 테이블 생성
// 컬럼: 이름, 나이, 결혼여부, 자기소개, 생성일
// 테이블 안에 데이터가 들어갈 수 있는 틀(컬럼들)을 만듬
module.exports = (sequelize, DataTypes) => {
	// sequelize.define 안에 테이블 이름, 테이블 내용 들어감
	return sequelize.define('user', {
		name: {
			type: DataTypes.STRING(20),   // type: 자료형, 글자수 20자 제한
			allowNull: false,   // Null 허용할거니?
			unique: true,   // 고유값이니?
		},
		age: {
			type: DataTypes.INTEGER.UNSIGNED,   // unsigned: 음수X
			allowNull: false,
		},
		married: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
		},
		comment: {
			type: DataTypes.TEXT,
			allowNull: true,
		},
		created_at: {
			type: DataTypes.DATE,
			allowNull: false,
			defaultValue: sequelize.literal('now()'),   // db한테 직접 알아내라고 지시
		}
	}, {
		timestamps: false,   // 시퀄라이즈에게 생성일 자동으로 생성하도록 (생성일 따로 있으니 false처리)
		underscored: true,   // true: 스네이크케이스 권장, false: 카멜케이스 권장
	});
};

// type: 자료형