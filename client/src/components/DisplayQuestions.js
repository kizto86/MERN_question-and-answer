import React from "react";
import { Accordion, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

import GetAnswers from "./GetAnswers";

const DisplayQuestions = (props) => {
  if (props.question) {
    return (
      <Accordion>
        <Card>
          <Card.Header>
            <Accordion.Toggle as={Card.Header} variant="link" eventKey="0">
              {props.question.question_title}
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey="0">
            <Card.Body>
              {props.question.question_description}
              <Link
                to={"/create-answer-to/" + props.question._id}
                className="nav-link"
              >
                Create answer
              </Link>
              <GetAnswers question={props.question._id} />
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
    );
  } else {
    return <span>No question specified.</span>;
  }
};

export default DisplayQuestions;
