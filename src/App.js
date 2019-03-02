import React, { Component } from "react";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      isLoaded: false
    };
  }

  componentDidMount() {
    fetch("https://pokeapi.co/api/v2/pokemon/")
      .then(res => res.json())
      .then(json => {
        this.setState({
          isLoaded: true,
          items: json.results
        });
      });
  }

  render() {
    var { isLoaded, items } = this.state;
    if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div className="App">
          <ul>
            {items.map(item => (
              <li key={item.name}>
                Name: {item.name} | URL: {item.url}
              </li>
            ))}
          </ul>
        </div>
      );
    }
  }
}
export default App;
