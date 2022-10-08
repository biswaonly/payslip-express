const express = require("express");
const Model = require("../models/model");
const payslipService = require("../services/payslip");
const router = express.Router();

router.get("/generate/all", async function (req, res, next) {
  try {
    let users = await Model.find();
    const date = new Date();
    const month = date.toLocaleString("default", { month: "long" });
    const buffers = await payslipService.generateBulk(users, month);
    buffers.forEach(async (buffer) => {
      res.set({
        "Content-Type": "application/pdf",
        "Content-Disposition": "attachment; filename=" + abc + ".pdf",
        "Content-Length": buffer.length,
      });
      buffer.end();
    });

    res.json("hello");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/generate/:userId", async function (req, res, next) {
  let user = await Model.findById(req.params.userId);
  const date = new Date();
  const month = date.toLocaleString("default", { month: "long" });
  const buffer = await payslipService.generatePDF(user, month);
  res.set({
    "Content-Type": "application/pdf",
    "Content-Disposition": "attachment; filename=" + user.name + ".pdf",
    "Content-Length": buffer.length,
  });

  res.end(buffer);
});

module.exports = router;
