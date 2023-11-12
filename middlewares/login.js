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
    const userId = jwt.verify(token, SECRET_KEY);
    Signs.findOne(userId).then((user) => {
      console.log(user.id);
      res.locals.user = user;
      next();
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      errorMessage: "로그인 후 사용이 가능한 Api입니다.",
    });
  }
};
