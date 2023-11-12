// 모델
// jwt
const jwt = require("jsonwebtoken");

const { Signs } = require("../models");
const SECRET_KEY = process.env.jwt_secret_key;

// module.exports = async (req, res, next) => {
//   const { authorization } = req.cookies.accessToken; // req.headers에 authorization이 있다.
//   console.log(authorization);
//   const [authType, authToken] = authorization.split(" ");
//   // authType: Bearer
//   // authToken: 실제 jwt 값

//   //   console.log([authType, authToken]);
//   if (authType !== "Bearer" || !authToken) {
//     res.status(400).json({
//       errorMessage: "로그인 후 사용이 가능한 API입니다.",
//     });
//     return;
//   }

//   try {
//     //복호화 및 검증 // secert키가 다르면 오류
//     const { userId } = jwt.verify(authToken, SECRET_KEY);
//     const user = await Signs.findById(userId);
//     res.locals.user = user;
//     next();
//   } catch (error) {
//     console.log(error);
//     res.status(400).json({
//       errorMessage: "로그인 후 사용이 가능한 Api입니다.",
//     });
//   }

//   return;
// };

module.exports = (req, res, next) => {
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
  } catch (err) {
    res.status(401).send({
      errorMessage: "로그인 후 이용 가능한 기능입니다.",
    });
  }
};
