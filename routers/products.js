const express = require("express");
const router = express.Router();
const { Products } = require("../models");

const authMiddleWare = require("../middlewares/login");

router.post("/product", authMiddleWare, async (req, res) => {
  try {
    const { title, content, status } = req.body;

    const userId = res.locals.user.id;

    const exProduct = await Products.findOne({
      where: { title: title },
    });

    if (exProduct) {
      return res.status(400).send("중복 상품입니다.");
    }

    if (Object.keys(req.body).length !== 3) {
      return res.json({ errorMessage: "정확히 입력하세요." });
    }

    await Products.create({
      // 외래키에 userId를 넣어준다.
      userId,
      title,
      content,
      status,
    });

    res.status(201).send("상품 등록 완료");
  } catch (error) {
    console.log(error);
  }
});

// router.get("/products", async (req, res) => {

// });

// router.get("/product/:productId", async (req, res) => {

// });

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
