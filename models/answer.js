const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const AnswerSchema = new Schema(
  {
    content: {
      type: String,
      required: true,
    },
    question: {
      type: mongoose.Types.ObjectId,
      required: true,
    },

    created_at: { type: Date, default: Date.now },
  },
  {
    versionKey: false,
  }
);

module.exports = mongoose.model("Answer", AnswerSchema);
