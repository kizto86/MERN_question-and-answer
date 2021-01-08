import React from "react";
import DisplayQuestion from "./DisplayQuestions";

//Mapping  over the array of questions to
//retrieve the individual questions for display

const Questions = (props) => {
  const questions = props.questions;
  return (
    <div>
      {questions.map((question) => (
        <DisplayQuestion question={question} key={question._id} />
      ))}
    </div>
  );
};

export default Questions;
