import React, { Component } from "react";
import { Container, Navbar } from "react-bootstrap";
import ImageCard from "./ImageCard";

class Gallery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      isLoaded: false,
      apiKey: "a24ed6015b7ba9bd2c93c4a73ff8a430",
      imageFilePath: ""
    };
  }

  componentDidMount() {
    fetch(
      `https://api.themoviedb.org/3/movie/upcoming?api_key=${this.state.apiKey}`
    )
      .then(res => res.json())
      .then(json => {
        this.setState({
          items: json,
          isLoaded: true,
          imageFilePath: "https://image.tmdb.org/t/p/original/"
        });
      });
  }

  render() {
    var { items, isLoaded, imageFilePath } = this.state;
    if (isLoaded) {
      return (
        <Container>
          <Navbar bg="dark" variant="dark" sticky="top">
            <Navbar.Brand href="#home">{" Latest Movies "}</Navbar.Brand>
          </Navbar>
          <br />
          <div className="container-home">
            {items.results.map(item => (
              <ImageCard
                key={item.id}
                rating={item.vote_average}
                title={item.original_title}
                explanation={item.overview}
                filename={item.poster_path}
                filepath={imageFilePath}
              />
            ))}
          </div>
        </Container>
      );
    } else {
      return <div>Loading...</div>;
    }
  }
}

export default Gallery;
