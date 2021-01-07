import React from "react";
import { Card } from "react-bootstrap";

const DisplayAnswers = (props) => {
  if (props.answer) {
    return (
      <div>
        <Card>
          <Card.Body>{props.answer.content}</Card.Body>
        </Card>
      </div>
    );
  } else {
    return <span>No prop passed to the component</span>;
  }
};

export default DisplayAnswers;
