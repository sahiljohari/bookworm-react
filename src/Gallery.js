import React, { useEffect, useReducer } from "react";
import { Container, Navbar } from "react-bootstrap";
import ImageCard from "./ImageCard";

const API_KEY = "a24ed6015b7ba9bd2c93c4a73ff8a430";

const initialState = {
  items: [],
  apiKey: "",
  imageFilePath: "",
  pageState: "loading"
};

function reducer(state, action) {
  switch (action.type) {
    case "getItems":
      return {
        ...state,
        items: action.payload,
        imageFilePath: action.imgPath,
        pageState: "loaded"
      };

    default:
      return state;
  }
}

export default function Gallery() {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}`)
      .then(res => res.json())
      .then(json => {
        dispatch({
          type: "getItems",
          payload: json.results,
          imgPath: "https://image.tmdb.org/t/p/original/"
        });
      });
  }, []);

  let content;
  switch (state.pageState) {
    case "loading":
      content = <div>Loading...</div>;
      break;

    case "loaded":
      content = (
        <Container>
          <Navbar bg="dark" variant="dark" sticky="top">
            <Navbar.Brand href="#home">{" Latest Movies "}</Navbar.Brand>
          </Navbar>
          <br />
          <div className="container-home">
            {state.items.map(item => (
              <ImageCard
                key={item.id}
                rating={item.vote_average}
                title={item.original_title}
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
  return <div>{content}</div>;
}
