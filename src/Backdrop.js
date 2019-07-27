import React from "react";
import { Carousel } from "react-bootstrap";

export default function Backdrop(props) {
  return (
    <Carousel indicators={false} fade={true}>
      {props.backdrop_items.map(bItems => (
        <Carousel.Item key={bItems.id}>
          <img
            className="d-block w-100"
            src={props.base_url + props.resolution + bItems.backdrop_path}
            alt="First slide"
          />
          <Carousel.Caption>
            <h3>{bItems.title}</h3>
            <p>{bItems.overview}</p>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}
