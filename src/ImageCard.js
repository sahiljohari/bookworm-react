// K0lMq6VQppEbemFDuBE0alvSbDgi1Vk1UU6dpM8h
import React, { Component } from "react";
import Button from "./control-components/Button";

class ImageCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      apiKey: "K0lMq6VQppEbemFDuBE0alvSbDgi1Vk1UU6dpM8h",
      isLoaded: false
    };
  }

  componentDidMount() {
    fetch(`https://api.nasa.gov/planetary/apod?api_key=${this.state.apiKey}`)
      .then(res => res.json())
      .then(json => {
        this.setState({
          isLoaded: true,
          items: json
        });
      });
  }

  render() {
    var { isLoaded, items } = this.state;
    if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div className="card">
          <h1>{items.title}</h1>
          <img className="image" src={items.url} alt="" />
          <p>{items.explanation}</p>
          <Button />
        </div>
      );
    }
  }
}
export default ImageCard;
