import React from "react";

export default function Backdrop(props) {
  return (
    <div className="backdrop">
      <img
        className="backdrop-img"
        src={props.backdrop_path}
        alt="Now playing"
      />
      <h1 className="backdrop-title">Now Playing : {props.title}</h1>

      {/* <p className="backdrop-desc">{props.description}</p> */}
    </div>
  );
}
