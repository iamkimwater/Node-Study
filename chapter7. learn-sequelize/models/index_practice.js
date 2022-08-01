const path = require('path');
const Sequelize = require('sequelize');

const env = process.env.NODE_ENV || 'development';   // 배포용 : 'production'
const config = require('../config/config.json')   // sequelize에 대한 설정파일

const db = {};