import React, { useEffect, useReducer } from "react";
import { Container, Navbar } from "react-bootstrap";
import ImageCard from "./ImageCard";
import Backdrop from "./Backdrop";

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
  }, []);

  let content;
  switch (state.pageState) {
    case "loading":
      content = <h1 className="loader">Summoning the movie universe</h1>;
      break;

    case "loaded":
      content = (
        <Container>
          <Navbar bg="dark" variant="dark" className="navbar-top">
            <Navbar.Brand href="#home" className="brand">
              {" Movie Hub "}
            </Navbar.Brand>
          </Navbar>
          <Backdrop
            base_url={state.imageFilePath}
            backdrop_items={state.backdropItems}
            resolution={"/w1280/"}
          />

          <br />
          <Navbar bg="dark" variant="dark" className="sub-header">
            <Navbar.Brand>{" Popular this month "}</Navbar.Brand>
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
