const express = require("express");
const router = express.Router();

const mongoose = require("mongoose");

// Transaction Model
const Transaction = require("../../models/transactions");

// @route   GET api/transactions
// @desc    Get all Transaction
// @access  Public
router.get("/", (req, res) => {
  Transaction.find()
    .sort({ doneAt: -1 })
    .then(transactions => res.json(transactions));
});

// @route   POST api/transactions
// @desc    Create new Transaction
// @access  Public
router.post("/", (req, res) => {
  // get user id from req.user.id once auth is implemented
  const { doneFor, expense } = req.body;
  const newTrans = new Transaction({
    doneBy: req.user.id || mongoose.Types.ObjectId(),
    doneFor,
    expense
  });

  newTrans.save().then(trans => res.json(trans));
});

// @route   DELETE api/transactions/id
// @desc    Delete a Transaction
// @access  Public
router.delete("/:id", (req, res) => {
  // get user id from req.user.id once auth is implemented
  Transaction.findOne({
    doneBy: req.user.id || mongoose.Types.ObjectId(),
    _id: req.params.id
  })
    .then(trans => trans.remove().then(() => res.json({ success: true })))
    .catch(err => res.status(404).json({ success: false }));
});

module.exports = router;
