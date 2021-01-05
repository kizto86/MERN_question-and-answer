const express = require("express");

const router = express.Router();
const Question = require("../models/question");
const mongoose = require("mongoose");
const Answer = require("../models/answer");

function asyncHandler(cb) {
  return async (req, res, next) => {
    try {
      await cb(req, res, next);
    } catch (err) {
      next(err);
    }
  };
}

//Send a GET request to /questions to read a list of questions
router.get(
  "/",
  asyncHandler(async (req, res) => {
    const offset = req.query.offset | 0;
    const limit = req.query.limit | 0 || 20;
    const questions = await Question.find()
      //.sort({ created_at: "desc" })
      .skip(offset)
      .limit(limit);
    res.json(questions);
  })
);

//Send a POST request to /questions to create a new question
router.post(
  "/",
  asyncHandler(async (req, res) => {
    if (
      req.body.username &&
      req.body.question_title &&
      req.body.question_description
    ) {
      const question = new Question({
        username: req.body.username,
        question_title: req.body.question_title,
        question_description: req.body.question_description,
      });
      await question.save();
      res.status(201).json({
        message: "question created successful",
      });
    } else {
      res.status(400).json({
        message:
          "username, question_title and question_description are required",
      });
    }
  })
);
// Send a GET request to / questions/:id/answers to read answers to a particular question
router.get(
  "/:id/answers",
  asyncHandler(async (req, res) => {
    const _id = req.params.id;
    const offset = req.query.offset | 0;
    const limit = req.query.limit | 0 || 20;
    if (_id) {
      const savedQuestion = await Question.findById(_id);
      const savedAnswer = await Answer.find({ question: _id })
        .skip(offset)
        .limit(limit);
      res.status(200).json({
        message: "Answers fetched successful",
        question: savedQuestion,
        answers: savedAnswer,
      });
    } else {
      res.status(404).json({
        message: "Invalid question id",
      });
    }
  })
);

//Send a POST request to /questions/:id/answer to create  a new answer for a particular question
router.post(
  "/:id/answer",
  asyncHandler(async (req, res) => {
    if (req.body.content) {
      const answer = new Answer({
        content: req.body.content,
        question: mongoose.Types.ObjectId(req.params.id),
      });
      await answer.save();
      res.status(201).json({
        message: "Answer created successful",
      });
    } else {
      res.status(404).json({ message: "content is required" });
    }
  })
);

module.exports = router;
