const express = require("express");
const router = express.Router();
const { Signs } = require("../models");
const bcrypt = require("bcrypt");

router.post("/sign", async (req, res) => {
  try {
    const { email, password, check_password, nickname } = req.body;

    const exUser = await Signs.findOne({
      where: { email: email },
    });

    if (!req.body.email.includes("@")) {
      return res.status(400).json({
        message: "이메일 형식으로 입력하세요.",
      });
    }

    if (exUser) {
      return res.status(400).json({ message: "이미 가입된 이메일입니다." });
    }

    if (Object.keys(req.body).length != 4) {
      return res.status(400).json({ errorMessage: "정확히 입력하세요." });
    }

    if (password.length < 7 || password !== check_password) {
      console.log("haha");
      return res
        .status(400)
        .json({ message: "비밀번호는 7자리 이상, 비밀번호를 확인하세요." });
    }
    const hash_password = await bcrypt.hash(password, 10);
    const check = await bcrypt.compare(password, hash_password);
    console.log(check);
    const user = await Signs.create({
      email,
      password: hash_password,
      nickname,
    });

    res.status(201).json({ message: "회원가입 완료", user: user });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
