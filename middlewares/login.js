// 모델
// jwt
const jwt = require("jsonwebtoken");

const { Signs } = require("../models");
const SECRET_KEY = process.env.jwt_secret_key;

module.exports = async (req, res, next) => {
  const token = req.cookies.accessToken;
  // console.log(token);

  if (!token) {
    res.status(401).send({
      errorMessage: "로그인 후 이용 가능한 기능입니다.",
    });
    return;
  }

  try {
    //복호화 및 검증 // secert키가 다르면 오류
    const userId = jwt.verify(token, SECRET_KEY);
    await Signs.findOne(userId);
    res.locals.user = user;
    next();
  } catch (error) {
    console.log(error);
    res.status(400).json({
      errorMessage: "로그인 후 사용이 가능한 Api입니다.",
    });
  }
};
