import React, { Component } from 'react';

class JokeCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showAnswer: false
    }
  }

  onClick = (e) => {
    this.setState( {showAnswer: !this.state.showAnswer} );
  }

  ifShowAnswer = (punchline) => {
    if(this.state.showAnswer)
      return (
        <div>
          <button className="App-button red" onClick={this.onClick}>Hide Answer</button>
          <p>{punchline}</p>
        </div>
      )
    else
      return (
        <div>
          <button className="App-button blue" onClick={this.onClick}>Show Answer</button>
        </div>
      )
  }

  render() { 
    const joke = this.props.joke 
    return ( 
      <div className={this.props.className}>
        <h3>{joke.type}</h3>
        <p>{joke.setup}</p>
        {this.ifShowAnswer(joke.punchline)}
      </div>
    )
  }
}
 
export default JokeCard;