require("dotenv").config();
const db_host = process.env.db_host;
const db_user = process.env.db_user;
const db_password = process.env.db_password;
const db_database = process.env.db_database;

const development = {
  username: db_user,
  //env.MYSQL_USERNAME은 불러오고자 하는 데이터의 키값이므로 자유롭게 이름설정이 가능하다.
  password: db_password,
  database: db_database,
  host: db_host,
  dialect: "mysql",
  //port: env.MYSQL_PORT
};

const production = {
  username: "root",
  password: null,
  database: "database_test",
  host: "127.0.0.1",
  dialect: "mysql",
};

const test = {
  username: "root",
  password: null,
  database: "database_test",
  host: "127.0.0.1",
  dialect: "mysql",
};

module.exports = { development, production, test };
