import React, { useEffect, useReducer } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";

import { ReactComponent as Logo } from "./assets/undraw_movie_night_93wl.svg";
import Backdrop from "./Backdrop";
import GallerySection from "./GallerySection";
import Footer from "./Footer";

const initialState = {
  now_playing: [],
  imageFilePath: "https://image.tmdb.org/t/p",
  movie_categories: [],
  pageState: "loading"
};

function reducer(state, action) {
  switch (action.type) {
    case "GET_UPCOMING":
      return {
        ...state,
        movie_categories: [
          ...state.movie_categories,
          { id: "u", title: "Upcoming", items: action.payload }
        ],
        pageState: "loaded"
      };

    case "GET_NOW_PLAYING":
      return {
        ...state,
        movie_categories: [
          ...state.movie_categories,
          { id: "np", title: "Now Playing", items: action.payload }
        ],
        now_playing: action.payload
      };

    case "GET_POPULAR":
      return {
        ...state,
        movie_categories: [
          ...state.movie_categories,
          { id: "p", title: "Popular", items: action.payload }
        ]
      };

    // case "GET_LATEST":
    //   return {
    //     ...state,
    //     latest: action.payload
    //   };

    case "GET_TOP_RATED":
      return {
        ...state,
        movie_categories: [
          ...state.movie_categories,
          { id: "tr", title: "Top Rated", items: action.payload }
        ]
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
          type: "GET_NOW_PLAYING",
          payload: json.results.filter(
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
          type: "GET_UPCOMING",
          payload: json.results
            .filter(result => result.vote_average !== 0)
            .sort((a, b) => b.vote_average - a.vote_average)
        });
      });

    fetch(
      `${process.env.REACT_APP_API_URL}/3/movie/popular?api_key=${
        process.env.REACT_APP_API_KEY
      }`
    )
      .then(res => res.json())
      .then(json => {
        dispatch({
          type: "GET_POPULAR",
          payload: json.results
            .filter(result => result.vote_average !== 0)
            .sort((a, b) => b.vote_average - a.vote_average)
        });
      });

    // Need to understand how to handle this scenario
    // fetch(
    //   `${process.env.REACT_APP_API_URL}/3/movie/latest?api_key=${
    //     process.env.REACT_APP_API_KEY
    //   }`
    // )
    //   .then(res => res.json())
    //   .then(json => {
    //     dispatch({
    //       type: "GET_LATEST",
    //       payload: json.results
    //         .filter(result => result.vote_average !== 0)
    //         .sort((a, b) => b.vote_average - a.vote_average)
    //     });
    //   });

    fetch(
      `${process.env.REACT_APP_API_URL}/3/movie/top_rated?api_key=${
        process.env.REACT_APP_API_KEY
      }`
    )
      .then(res => res.json())
      .then(json => {
        dispatch({
          type: "GET_TOP_RATED",
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
                {state.movie_categories.map(movie => (
                  <Nav.Link href={`#${movie.id}`}> {movie.title}</Nav.Link>
                ))}
              </Nav>
            </Navbar.Collapse>
          </Navbar>
          <Backdrop
            base_url={state.imageFilePath}
            backdrop_items={state.now_playing}
            resolution={"/w1280/"}
          />

          {state.movie_categories.map(section => (
            <GallerySection
              key={section.id}
              id={section.id}
              brandName={section.title}
              items={section.items}
              imageFilePath={state.imageFilePath}
            />
          ))}

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
