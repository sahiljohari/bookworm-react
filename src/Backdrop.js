import React from "react";
// import { Carousel } from "react-bootstrap";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

export default function Backdrop(props) {
  return (
    <Carousel
      autoPlay={true}
      infiniteLoop={true}
      showIndicators={false}
      showStatus={false}
      showArrows={false}
      showThumbs={false}
    >
      {props.backdrop_items.map(bItems => (
        <div key={bItems.id}>
          <img
            src={props.base_url + props.resolution + bItems.backdrop_path}
            alt="Movie poster"
          />
          <div className="backdrop-bg">
            <div className="legend-box">
              <h3 className="backdrop-title">{bItems.title}</h3>
              <p className="backdrop-desc">{bItems.overview}</p>
            </div>
          </div>
        </div>
      ))}
    </Carousel>
  );
}
