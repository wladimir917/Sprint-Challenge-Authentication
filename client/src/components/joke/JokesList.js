import React from 'react';
import axios from 'axios';
import JokeCard from './JokeCard';
import './Joke.css'


class Users extends React.Component {
  state = {
    jokes: [],
  };

  render() {
    return (
      <div className="Joke-container">
        <h2>Dad Jokes for Today!</h2>
        {this.state.jokes.map(joke => <JokeCard key={joke.id*Math.random()} className="Joke-container" joke={joke}/>)}
      </div>
    );
  }

  componentDidMount() {
    // get the token from somewhere
    const token = localStorage.getItem('jwt');

    // attach the token as the Authorization header
    const requestOptions = {
      headers: {
        Authorization: token,
      },
    };

    axios
      .get('http://localhost:5000/api/jokes', requestOptions)
      .then(response => {
        this.setState({ jokes: response.data });
        console.log(response.data);
      })
      .catch(err => {
        console.error(err);
      });
  }
}

export default Users;