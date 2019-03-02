import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class Button extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: ""
    };
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.setState({
      text: "View HD"
    });
  }

  handleClick() {}

  render() {
    return (
      <button type="button" onClick={this.handleClick}>
        {this.state.text}
      </button>
    );
  }
}

export default Button;
