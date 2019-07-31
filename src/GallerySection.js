import React from "react";
import { Navbar } from "react-bootstrap";
import ImageCard from "./ImageCard";

export default function GallerySection(props) {
  return (
    <div id={props.id} className="gallery-section">
      <Navbar bg="dark" variant="dark" className="sub-header">
        <Navbar.Brand>{props.brandName}</Navbar.Brand>
      </Navbar>
      <div className="container-home">
        {props.items.map(item => (
          <ImageCard
            key={item.id}
            rating={item.vote_average}
            title={item.title}
            explanation={item.overview}
            filename={item.poster_path}
            filepath={props.imageFilePath}
          />
        ))}
      </div>
    </div>
  );
}
