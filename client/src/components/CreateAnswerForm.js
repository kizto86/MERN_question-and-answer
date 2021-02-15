import React, { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const CreateAnswerForm = () => {
  const { questionId } = useParams();
  const [content, setContent] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const answer = {
      content: content,
      question: questionId,
    };
    axios.post(
      `https://obscure-inlet-42322.herokuapp.com/${questionId}/answer`,
      answer
    );
    //.then((res) => console.log(res.data));
    window.location = "/";
    setContent("");
  };

  return (
    <div>
      <h3>Create a new answer</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="answer">Answer:</label>
          <textarea
            name="answer"
            id="answer"
            rows="5"
            cols="5"
            required
            placeholder="Answer"
            className="form-control"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <div className="form-group">
          <button
            type="submit"
            className="btn btn-primary"
            value="Submit Answer"
          >
            Submit Answer
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateAnswerForm;
