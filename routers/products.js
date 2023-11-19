const express = require("express");
const router = express.Router();
const { Products, Signs } = require("../models");

const authMiddleWare = require("../middlewares/login");

router.post("/product", authMiddleWare, async (req, res) => {
  try {
    const { title, content, status } = req.body;

    const userId = res.locals.user.id;

    const exProduct = await Products.findOne({
      where: { title: title },
    });

    if (exProduct) {
      return res.status(400).json({ message: "중복 상품입니다." });
    }

    if (Object.keys(req.body).length !== 3) {
      return res.json({ errorMessage: "정확히 입력하세요." });
    }

    const product = await Products.create({
      // 외래키에 userId를 넣어준다.
      userId,
      title,
      content,
      status,
    });

    res.status(201).json({ message: "상품 등록 완료", 상품: product });
  } catch (error) {
    console.log(error);
  }
});

router.get("/products", async (req, res) => {
  const products = await Products.findAll();
  const createdAt = req.query.createdAt
    ? req.query.createdAt.toUpperCase()
    : "DESC";
  // req.query.createdAt 이 있으면 대문자 메서드를 실행하고,
  // 값이 없다면 기본적으로 내림차순을 실행한다.
  // 그리고 후에 order에 있는 연산자를 받는다.

  if (!products.length) {
    return res.status(400).json({ message: "상품이 존재하지 않습니다." });
  }

  const product = await Products.findAll({
    attributes: ["id", "title", "content", "status", "createdAt"],
    order: [["createdAt", createdAt === "ASC" ? "ASC" : "DESC"]],
    include: [
      {
        model: Signs,
        attributes: ["nickname"],
      },
    ],
  });

  return res.status(200).json({
    상품: product,
  });
});

router.get("/product/:productId", async (req, res) => {
  const { productId } = req.params;

  const products = await Products.findAll({});
  const p = await products.filter((product) => {
    console.log(typeof product.id, typeof productId);
    return product.id === Number(productId);
  });

  if (!p.length) {
    return res.status(400).json({ message: "상품이 존재하지 않습니다." });
  }

  const product = await Products.findOne({
    where: {
      id: productId,
    },
    attributes: ["id", "title", "content", "status", "createdAt"],
    include: [
      {
        model: Signs,
        attributes: ["nickname"],
      },
    ],
  });

  res.status(200).json({
    상품: product,
  });
});

router.patch("/product/:productId", authMiddleWare, async (req, res) => {
  const { productId } = req.params;
  const { content, status, title } = req.body;

  const products = await Products.findAll({});
  const product = products.filter((p) => {
    return p.id.toString() === productId;
  });

  try {
    if (!product.length) {
      return res.status(400).json({
        message: "상품을 찾을 수 없습니다.",
      });
    }
    if (Object.keys(req.body).length > 3) {
      return res.status(500).json({
        message: "데이터 형식에 올바르지 않습니다.",
      });
    }

    if (res.locals.user.id === product[0].dataValues.id) {
      await Products.update(
        { title, content, status },
        { where: { id: productId } }
      );

      return res.status(201).json({
        message: "상품 수정 완료",
      });
    }
    res.status(400).json({
      message: "관리자가 아닙니다.",
    });
  } catch (error) {
    return res.json(error);
  }
});

router.delete("/product/:productId", authMiddleWare, async (req, res) => {
  const { productId } = req.params;

  const products = await Products.findAll({});
  const product = products.filter((p) => {
    return p.id.toString() === productId;
  });
  try {
    if (!product.length) {
      return res.status(400).json({
        message: "상품을 찾을 수가 없습니다.",
      });
    }
    if (res.locals.user.id === product[0].dataValues.id) {
      await Products.destroy({ where: { id: productId } });

      return res.status(201).json({
        message: "상품 삭제 완료",
      });
    }

    res.status(400).json({
      message: "관리자가 아닙니다.",
    });
  } catch (error) {
    return res.json(error);
  }
});

module.exports = router;
