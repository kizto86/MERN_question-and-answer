const mongoose = require("mongoose");

const QuestionSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    question_title: {
      type: String,
      required: true,
    },
    question_description: {
      type: String,
      required: true,
    },

    created_at: { type: Date, default: Date.now },
  },

  {
    versionKey: false,
  }
);

module.exports = mongoose.model("Question", QuestionSchema);
