import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import { Link } from "react-router-dom";

export default class Nav extends Component {
  render() {
    return (
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
        <h1 className="navbar-brand">iHaveQuestions</h1>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav mr-auto">
            <li className="navbar-item">
              <Link to="/" className="nav-link">
                Questions
              </Link>
            </li>
            <li className="navbar-item">
              <Link to="/create-question" className="nav-link">
                Create Question
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}
