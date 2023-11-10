require("dotenv").config();
const express = require("express");
const router = express.Router();
const { Signs } = require("../models");
const cookieParser = require("cookie-parser");
const app = express();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const SECRET_KEY = process.env.jwt_secret_key;

app.use(cookieParser());

router.post("/login", async (req, res) => {
  try {
    const { password, email } = req.body;

    const user = await Signs.findOne({
      where: { email: email },
    });

    const id = user.dataValues.userId;

    // Access Token을 생성합니다.
    function createAccessToken(id) {
      const accessToken = jwt.sign(
        { id: id }, // JWT 데이터
        SECRET_KEY, // 비밀키
        { expiresIn: "12h" }
      ); // Access Token이 12시간 뒤에 만료되도록 설정합니다.

      return accessToken;
    }

    const accessToken = createAccessToken(id);
    res.cookie("accessToken", accessToken);

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).send("비밀번호를 잘못 입력하셨습니다.");
    }

    if (user.length === 0) {
      return res.status(400).send("회원이 아닙니다.");
    }
    if (isPasswordValid) {
      res.status(201).send("로그인 완료");
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
