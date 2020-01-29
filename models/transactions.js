const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const TransactionSchema = new Schema({
  doneBy: ObjectId,
  doneFor: { type: String, required: 'Please Enter Purpose' },
  expense: { type: Number, required: 'Please enter Expense' },
  doneAt: { type: Date, default: Date.now },
  type: {type: String, default: 'd'}
});

module.exports = Transaction = mongoose.model("transaction", TransactionSchema);
