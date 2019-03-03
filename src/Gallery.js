import React, { Component } from "react";
import { Container } from "react-bootstrap";
import ImageCard from "./ImageCard";

class Gallery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      apiKey: "K0lMq6VQppEbemFDuBE0alvSbDgi1Vk1UU6dpM8h"
    };
  }

  componentDidMount() {
    fetch(`https://api.nasa.gov/planetary/apod?api_key=${this.state.apiKey}`)
      .then(res => res.json())
      .then(json => {
        this.setState({
          items: json
        });
      });
  }

  render() {
    return (
      <Container>
        <ImageCard
          title={this.state.items.title}
          explanation={this.state.items.explanation}
          url={this.state.items.url}
        />
        <ImageCard
          title={this.state.items.title}
          explanation={this.state.items.explanation}
          url={this.state.items.url}
        />
      </Container>
    );
  }
}

export default Gallery;
