import React, { useEffect, useReducer } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { ReactComponent as Logo } from "./assets/undraw_movie_night_93wl.svg";
import ImageCard from "./ImageCard";
import Backdrop from "./Backdrop";
import Footer from "./Footer";

const initialState = {
  items: [],
  imageFilePath: "https://image.tmdb.org/t/p",
  backdropItems: [],
  pageState: "loading"
};

function reducer(state, action) {
  switch (action.type) {
    case "getItems":
      return {
        ...state,
        items: action.payload,
        pageState: "loaded"
      };

    case "getNowPlaying":
      return {
        ...state,
        backdropItems: action.backdropItems
      };

    default:
      return state;
  }
}

export default function Gallery() {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    fetch(
      `${process.env.REACT_APP_API_URL}/3/movie/now_playing?api_key=${
        process.env.REACT_APP_API_KEY
      }`
    )
      .then(res => res.json())
      .then(json => {
        dispatch({
          type: "getNowPlaying",
          backdropItems: json.results.filter(
            result =>
              result.vote_average !== 0 && result.original_language === "en"
          )
        });
      });

    fetch(
      `${process.env.REACT_APP_API_URL}/3/movie/upcoming?api_key=${
        process.env.REACT_APP_API_KEY
      }`
    )
      .then(res => res.json())
      .then(json => {
        dispatch({
          type: "getItems",
          payload: json.results
            .filter(result => result.vote_average !== 0)
            .sort((a, b) => b.vote_average - a.vote_average)
        });
      });
  }, []);

  let content;
  switch (state.pageState) {
    case "loading":
      content = <h1 className="loader">Summoning the movie universe</h1>;
      break;

    case "loaded":
      content = (
        <Container>
          <Navbar bg="dark" variant="dark" className="navbar-top" expand="md">
            <Logo />
            <Navbar.Brand href="#home" className="brand">
              {" Movie Hub "}
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">
                <Nav.Link href="#np">Now Playing</Nav.Link>
                <Nav.Link href="#u">Upcoming</Nav.Link>
                <Nav.Link href="#p">Popular</Nav.Link>
                <Nav.Link href="#t">Trending</Nav.Link>
                <Nav.Link href="#tr">Top Rated</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
          <Backdrop
            base_url={state.imageFilePath}
            backdrop_items={state.backdropItems}
            resolution={"/w1280/"}
          />

          <br />

          <div id="np">
            <Navbar bg="dark" variant="dark" className="sub-header">
              <Navbar.Brand>{" Now Playing "}</Navbar.Brand>
            </Navbar>
            <div className="container-home">
              {state.backdropItems.map(item => (
                <ImageCard
                  key={item.id}
                  rating={item.vote_average}
                  title={item.title}
                  explanation={item.overview}
                  filename={item.poster_path}
                  filepath={state.imageFilePath}
                />
              ))}
            </div>
          </div>
          <br />
          <div id="u">
            <Navbar bg="dark" variant="dark" className="sub-header">
              <Navbar.Brand>{" Upcoming "}</Navbar.Brand>
            </Navbar>
            <div className="container-home">
              {state.items.map(item => (
                <ImageCard
                  key={item.id}
                  rating={item.vote_average}
                  title={item.title}
                  explanation={item.overview}
                  filename={item.poster_path}
                  filepath={state.imageFilePath}
                />
              ))}
            </div>
          </div>
          <Footer />
        </Container>
      );
      break;
    default:
      content = null;
      break;
  }
  return state.pageState === "loaded" ? (
    <div>{content}</div>
  ) : (
    <div className="load-container">{content}</div>
  );
}
