// K0lMq6VQppEbemFDuBE0alvSbDgi1Vk1UU6dpM8h
import React from "react";
import { Button, Card } from "react-bootstrap";

export default function ImageCard(props) {
  if (props.explanation) {
    const des = props.explanation;
    var summary = des.substr(0, des.indexOf(".") + 1);
  }
  return (
    <Card bg="dark" text="white">
      <Card.Header>Rating: {props.rating}/10</Card.Header>
      <Card.Img variant="top" src={props.filepath + props.filename} />
      <Card.Body className="c-body">
        <div>
          <Card.Title>{props.title}</Card.Title>
          <Card.Text>{summary}</Card.Text>
        </div>
        <Button variant="primary">Read More</Button>
      </Card.Body>
    </Card>
  );
}
