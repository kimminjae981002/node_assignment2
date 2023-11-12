// env
require("dotenv").config();
const db_host = process.env.db_host;
const db_user = process.env.db_user;
const db_password = process.env.db_password;

// npm package
const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const mysql2 = require("mysql2");

const signRouter = require("./routers/sign");
const loginRouter = require("./routers/login");
const productRouter = require("./routers/products");

app.use(express.json());
app.use(cookieParser());
// db 연결
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

// 라우터 연결
app.use("/api", express.urlencoded({ extended: false }), loginRouter);

const authMiddleWare = require("./middlewares/login.js");

// product 라우터 연결
app.use("/api", authMiddleWare, productRouter);

// 내 정보 보기
// app.use("/api/auth/me", authMiddleWare, async (req, res) => {
//   const email = res.locals.user.email;
//   const nickname = res.locals.user.nickname;
//   res.json({
//     user: {
//       email,
//       nickname,
//     },
//   });
// });

app.use("/api", express.urlencoded({ extended: false }), [
  signRouter,
  loginRouter,
]);

// 서버 연결
app.listen(8080, () => {
  console.log("서버 연결 완료");
});
