import React from "react";
import axios from "axios";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import Nav from "./components/Nav";
import CreateQuestionForm from "./components/CreateQuestionForm";
import Questions from "./components/Questions";
import CreateAnswerForm from "./components/CreateAnswerForm";
const { baseUrl } = require("./components/Config");

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [],
    };
  }

  // "http://localhost:5000/questions/"
  componentDidMount() {
    this.getQuestions();
  }

  //Making an api call to the database to GET the questions
  getQuestions() {
    axios
      .get(baseUrl)
      .then((response) => {
        this.setState({ questions: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    const { questions } = this.state;
    return (
      <Router>
        <div className="container">
          <Nav />
          <br />
          <Route
            path="/"
            exact
            render={() => <Questions questions={questions} />}
          />
          <Route
            path="/create-question"
            render={() => <CreateQuestionForm />}
          />
          <Route
            path="/create-answer-to/:questionId"
            component={CreateAnswerForm}
          />
        </div>
      </Router>
    );
  }
}

export default App;
