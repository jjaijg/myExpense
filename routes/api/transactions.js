const express = require("express");
const router = express.Router();

const auth = require("../../middleware/auth");
const mongoose = require("mongoose");

// Transaction Model
const Transaction = require("../../models/transactions");

// @route   GET api/transactions
// @desc    Get all Transaction
// @access  Public
router.get("/", auth, (req, res) => {
  Transaction.find({ doneBy: req.user.id })
    .sort({ doneAt: -1 })
    .then(transactions =>
      res.json({
        id: "GET_TRANSACTIONS",
        success: true,
        data: transactions
      })
    )
    .catch(err =>
      res.status(500).json({
        id: "GET_TRANSACTIONS",
        success: false,
        msg: "Unable to get transactions details. Try reloading page"
      })
    );
});

// @route   POST api/transactions
// @desc    Create new Transaction
// @access  Public
router.post("/", auth, (req, res) => {
  // get user id from req.user.id once auth is implemented
  const { doneFor, expense, doneAt, type } = req.body;
  if (!doneFor || !expense || !doneAt)
    return res.status(400).json({
      id: "ADD_TRANSACTION",
      success: false,
      msg: "Enter all Fields"
    });

  const id = req.user ? req.user.id : mongoose.Types.ObjectId();
  const newTrans = new Transaction({
    doneBy: id,
    doneFor,
    expense,
    doneAt,
    type
  });

  newTrans
    .save()
    .then(trans =>
      res.json({
        id: "ADD_TRANSACTION",
        success: true,
        data: trans
      })
    )
    .catch(err =>
      res.status(500).json({
        id: "ADD_TRANSACTION",
        success: false,
        msg: "Unable to add transactions detail. Please check internet"
      })
    );
});

// @route   POST api/transactions/updateAll
// @desc    updates all ransactions - Dev use
// @access  Public
// router.get("/updateall", (req, res) => {
//   Transaction.updateMany({}, { type: "d" }, { strict: false, upsert: true })
//     .then(transactions => res.json(transactions))
//     .catch(err => res.status(400).json(err));
// });

// @route   DELETE api/transactions/id
// @desc    Delete a Transaction
// @access  Public
router.delete("/:id", auth, (req, res) => {
  const id = req.user ? req.user.id : mongoose.Types.ObjectId();
  // get user id from req.user.id once auth is implemented
  //     doneBy: id || mongoose.Types.ObjectId(),

  Transaction.findById(req.params.id)
    .then(trans =>
      trans.remove().then(() =>
        res.json({
          id: "DELETE_TRANSACTION",
          success: true,
          msg: "Deleted successfully"
        })
      )
    )
    .catch(err =>
      res.status(404).json({
        id: "DELETE_TRANSACTION",
        success: false,
        msg: "Oops! Transaction not found"
      })
    );
});

module.exports = router;
