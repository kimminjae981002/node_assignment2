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
    const token = req.cookies.accessToken;
    const user = jwt.verify(token, SECRET_KEY).id;

    const u = await Signs.findOne({
      where: {
        id: user,
      },
    });
    res.locals.user = u;
    console.log("middleware", ":", res.locals.user);
    next();
    // Signs.findOne({ id: userId }).then((user) => {
    //   res.locals.user = user;
    //   console.log(user);
    //   next();
    // });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      errorMessage: "로그인 후 사용이 가능한 Api입니다.",
    });
  }
};
