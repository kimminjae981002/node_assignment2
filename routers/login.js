require("dotenv").config();
const express = require("express");
const router = express.Router();
const { Signs } = require("../models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const SECRET_KEY = process.env.jwt_secret_key;

const authMiddleWare = require("../middlewares/login");

router.post("/login", async (req, res) => {
  try {
    const { password, email } = req.body;

    const user = await Signs.findOne({
      where: { email: email },
    });

    const users = await Signs.findAll();
    const a = users.filter((user) => {
      return user.email === email;
    });
    if (!a.length) {
      return res.status(400).json({ message: "회원이 아닙니다." });
    }

    // const id = user.dataValues.userId;

    // Access Token을 생성합니다.
    // function createAccessToken(id) {
    //   const accessToken = jwt.sign(
    //     { id: id }, // JWT 데이터
    //     SECRET_KEY, // 비밀키
    //     { expiresIn: "12h" }
    //   ); // Access Token이 12시간 뒤에 만료되도록 설정합니다.

    //   return accessToken;
    // }

    // const accessToken = createAccessToken(id);
    // res.cookie("accessToken", accessToken);

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res
        .status(400)
        .json({ message: "비밀번호를 잘못 입력하셨습니다." });
    }

    if (isPasswordValid) {
      const accessToken = jwt.sign({ id: user.id }, SECRET_KEY, {
        expiresIn: "12h",
      });
      res.cookie("accessToken", accessToken);

      res
        .status(201)
        .send({ message: "로그인 완료", accessToken: accessToken });
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "뭄마" });
  }
});

router.get("/me", authMiddleWare, async (req, res) => {
  // 인증 미들웨어를 통해 얻은 사용자 정보를 추출
  const token = req.cookies.accessToken;

  if (token) {
    console.log(res.locals.user);
    const { email, nickname } = res.locals.user;
    // 사용자 정보를 반환
    res.status(200).json({
      user: { email, nickname },
    });
  }
});

router.post("/logout", (req, res) => {
  res.clearCookie("accessToken");
  res.status(200).json({ message: "Logout successful" });
});

module.exports = router;
