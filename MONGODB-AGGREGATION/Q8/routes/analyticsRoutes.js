const express = require("express");
const borrowerRouter = express.Router();
const Loan = require("../models/loan");
const mongoose = require("mongoose");

borrowerRouter.get("/analytics/borrowed-books", async (req, res) => {
  try {
    const data = await Loan.aggregate([
      {
        $lookup: {
          from: "books",
          localField: "bookId",
          foreignField: "_id",
          as: "book",
        },
      },
      { $unwind: "$book" },
      {
        $group: {
          _id: "$borrowerId",
          booksBorrowed: { $push: "$book.title" },
        },
      },
    ]);
    if (!data.length) return res.status(200).json({ message: "No data found" });
    res.status(200).json(data);
  } catch {
    res.status(500).json({ error: "Something went wrong" });
  }
});

borrowerRouter.get("/analytics/top-borrowed-books", async (req, res) => {
  try {
    const data = await Loan.aggregate([
      { $group: { _id: "$bookId", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 3 },
      {
        $lookup: {
          from: "books",
          localField: "_id",
          foreignField: "_id",
          as: "book",
        },
      },
      { $unwind: "$book" },
      {
        $project: {
          title: "$book.title",
          borrowCount: "$count",
        },
      },
    ]);
    if (!data.length) return res.status(200).json({ message: "No data found" });
    res.status(200).json(data);
  } catch {
    res.status(500).json({ error: "Something went wrong" });
  }
});

borrowerRouter.get("/analytics/borrower-history/:id", async (req, res) => {
  try {
    const borrowerId = new mongoose.Types.ObjectId(req.params.id);
    const data = await Loan.aggregate([
      { $match: { borrowerId } },
      {
        $lookup: {
          from: "books",
          localField: "bookId",
          foreignField: "_id",
          as: "book",
        },
      },
      { $unwind: "$book" },
    ]);
    if (!data.length) return res.status(200).json({ message: "No data found" });
    res.status(200).json(data);
  } catch {
    res.status(500).json({ error: "Something went wrong" });
  }
});

borrowerRouter.get("/analytics/frequent-borrowers", async (req, res) => {
  try {
    const data = await Loan.aggregate([
      { $group: { _id: "$borrowerId", count: { $sum: 1 } } },
      { $match: { count: { $gt: 5 } } },
      {
        $lookup: {
          from: "borrowers",
          localField: "_id",
          foreignField: "_id",
          as: "borrower",
        },
      },
      { $unwind: "$borrower" },
      {
        $project: {
          name: "$borrower.name",
          email: "$borrower.email",
          totalLoans: "$count",
        },
      },
    ]);
    if (!data.length) return res.status(200).json({ message: "No data found" });
    res.status(200).json(data);
  } catch {
    res.status(500).json({ error: "Something went wrong" });
  }
});

borrowerRouter.get("/analytics/loan-reports", async (req, res) => {
  try {
    const data = await Loan.aggregate([
      {
        $lookup: {
          from: "books",
          localField: "bookId",
          foreignField: "_id",
          as: "book",
        },
      },
      { $unwind: "$book" },
      {
        $lookup: {
          from: "borrowers",
          localField: "borrowerId",
          foreignField: "_id",
          as: "borrower",
        },
      },
      { $unwind: "$borrower" },
    ]);
    if (!data.length) return res.status(200).json({ message: "No data found" });
    res.status(200).json(data);
  } catch {
    res.status(500).json({ error: "Something went wrong" });
  }
});

module.exports = { borrowerRouter };
