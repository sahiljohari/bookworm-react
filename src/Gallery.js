import React, { useEffect, useReducer } from "react";
import { Container, Navbar } from "react-bootstrap";
import ImageCard from "./ImageCard";
import Backdrop from "./Backdrop";

const initialState = {
  items: [],
  imageFilePath: "https://image.tmdb.org/t/p",
  backdropTitle: "",
  backdropPath: "",
  backdropSummary: "",
  pageState: "loading"
};

function sortDataByRating(data) {
  return data
    .filter(result => result.vote_average !== 0)
    .sort((a, b) => b.vote_average - a.vote_average);
}

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
        backdropPath: action.backdropPath,
        backdropTitle: action.backdropTitle,
        backdropSummary: action.backdropSummary
      };

    default:
      return state;
  }
}

function fetchData(dispatch) {
  const API_KEY = "a24ed6015b7ba9bd2c93c4a73ff8a430";
  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}`)
      .then(res => res.json())
      .then(json => {
        dispatch({
          type: "getItems",
          payload: sortDataByRating(json.results)
        });
      });

    fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}`)
      .then(res => res.json())
      .then(json => {
        dispatch({
          type: "getNowPlaying",
          backdropPath: json.results[0].backdrop_path,
          backdropTitle: json.results[0].title,
          backdropSummary: json.results[0].overview
        });
      });
  }, []);
}

export default function Gallery() {
  const [state, dispatch] = useReducer(reducer, initialState);
  fetchData(dispatch);

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
            backdrop_path={state.imageFilePath + `/w780/` + state.backdropPath}
            title={state.backdropTitle}
            description={state.backdropSummary}
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
