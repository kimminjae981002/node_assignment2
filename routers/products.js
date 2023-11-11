const express = require("express");
const router = express.Router();
const { Products } = require("../models");

router.post("/product", async (req, res) => {
  try {
    const { title, content, status } = req.body;

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
      title,
      content,
      status,
    });

    res.status(201).send("상품 등록 완료");
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
