require("dotenv").config();
const db_host = process.env.db_host;
const db_user = process.env.db_user;
const db_password = process.env.db_password;

const express = require("express");
const app = express();
const mysql2 = require("mysql2");
const signRouter = require("./routers/sign");
const loginRouter = require("./routers/login");
app.use(express.json());

const con = mysql2.createConnection({
  host: db_host,
  port: "3306",
  user: db_user,
  password: db_password,
  database: "database_development",
});

con.connect((err) => {
  if (err) console.log("MySQL 연결 실패 : ", err);
  console.log("MySQL Connected!!!");
});

app.get("/", (req, res) => {
  res.send("hello world");
});

app.use("/api", express.urlencoded({ extended: false }), [
  loginRouter,
  signRouter,
]);

app.listen(8080, () => {
  console.log("서버 연결 완료");
});
