import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, FormText, Container, Row, Col } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom";
import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      value: '',
      results: [],
     };
  }

  handleChange = (event) => {
    this.setState({value: event.target.value});
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const API_KEY = 'fec8b5ab27b292a68294261bb21b04a5';
    API_KEY = 'ee2c0dac33fddb8ac2c599b250b08898';
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&page=1&include_adult=false`;
    axios.get(url, {
      params: {
        query: this.state.value
      }
    })
    .then((response) => {
      const results = response.data.results;
      this.setState({results: results});
      console.log(results);
    })
    .catch( (error) => {
      console.log(error);
    })
  }

  render() {
    return (
      <div>
        <h1>Reviewer - App prototype</h1>
        <form onSubmit={this.handleSubmit}>
          <label>
            Enter your search:
            <input type="text" value={this.state.value} onChange={this.handleChange} />
          </label>
          <input type="submit" value="Search" />
        </form>
        <div>
          {
            this.state.results.map((result) => {
              const imageUrl = `https://image.tmdb.org/t/p/w500${result.poster_path}`;
              return (
                <div key={result.id}>
                  <h2>{result.title}</h2>
                  <Link to={`/movies/${result.id}`}>
                    <img src={imageUrl} alt={result.title} />
                  </Link>
                </div>
              );
            })
          }
        </div>
      </div>
    );
  }
}

export default App;