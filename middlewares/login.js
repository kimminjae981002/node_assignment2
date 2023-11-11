// 모델
// jwt
const jwt = require("jsonwebtoken");

const { Signs } = require("../models");
const SECRET_KEY = process.env.jwt_secret_key;

module.exports = (req, res, next) => {
  const token = req.cookies.accessToken;
  console.log(token);
  if (!token) {
    res.status(401).send({
      errorMessage: "로그인 후 이용 가능한 기능입니다.",
    });
    return;
  }

  try {
    const { userId } = jwt.verify(token, SECRET_KEY);
    Signs.findOne(userId).then((user) => {
      res.locals.user = user;
      next();
    });
  } catch (err) {
    res.status(401).send({
      errorMessage: "로그인 후 이용 가능한 기능입니다.",
    });
  }
};
