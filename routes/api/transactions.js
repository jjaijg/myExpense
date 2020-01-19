const express = require("express");
const router = express.Router();

const auth = require("../../middleware/auth");
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
router.post("/", auth, (req, res) => {
  // get user id from req.user.id once auth is implemented
  const { doneFor, expense } = req.body;
  const id = req.user ? req.user.id : mongoose.Types.ObjectId();
  const newTrans = new Transaction({
    doneBy: id,
    doneFor,
    expense
  });

  newTrans.save().then(trans => res.json(trans));
});

// @route   DELETE api/transactions/id
// @desc    Delete a Transaction
// @access  Public
router.delete("/:id", auth, (req, res) => {
  const id = req.user ? req.user.id : mongoose.Types.ObjectId();
  // get user id from req.user.id once auth is implemented
  //     doneBy: id || mongoose.Types.ObjectId(),

  Transaction.findById(req.params.id)
    .then(trans => trans.remove().then(() => res.json({ success: true })))
    .catch(err => res.status(404).json({ success: false }));
});

module.exports = router;
