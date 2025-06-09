const express = require("express");
const loanRouter = express.Router();
const Loan = require("../models/loan");

loanRouter.post("/loans", async (req, res) => {
  try {
    const loan = await Loan.create(req.body);
    res.status(200).json(loan);
  } catch (err) {
    res.status(500).json({ error: "Something went wrong" });
  }
});

module.exports = loanRouter;
