const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const TransactionSchema = new Schema({
  doneBy: ObjectId,
  doneFor: { type: String, required: true },
  expense: { type: Number, required: true },
  doneAt: { type: Date, default: Date.now }
});

module.exports = Transaction = mongoose.model("transaction", TransactionSchema);
