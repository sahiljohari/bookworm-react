// K0lMq6VQppEbemFDuBE0alvSbDgi1Vk1UU6dpM8h
import React, { Component } from "react";
import { Button, Card } from "react-bootstrap";

class ImageCard extends Component {
  render() {
    if (this.props.explanation) {
      const des = this.props.explanation;
      var summary = des.substr(0, des.indexOf(".")) + ".";
    }
    return (
      <Card style={{ width: "18rem", float: "left" }}>
        <Card.Img variant="top" src={this.props.url} />
        <Card.Body>
          <Card.Title>{this.props.title}</Card.Title>
          <Card.Text>{summary}</Card.Text>
          <Button variant="primary">Read More</Button>
        </Card.Body>
      </Card>
    );
  }
}
export default ImageCard;
