import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';

import logo from './logo.svg';
import './App.css';
import UserLogin from './components/user/UserLogin';
import JokesList from './components/joke/JokesList';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogged: false,
      message: '',
    }
  }

  componentDidMount() {
    // get the token from somewhere
    const token = localStorage.getItem('jwt');
    const msg = localStorage.getItem('msg');

    this.setState({ isLogged: token, message: msg});
  }

  handleOnClickLogin = (event) => {
    this.props.history.push('/login');
  }

  handleOnClickRegister = (event) => {
    this.props.history.push('/register');
  }

  handleOnClickLogout = () => {
    if (localStorage.getItem('jwt')) {
      localStorage.removeItem('jwt');
    }
    this.props.history.push('/');
    this.setState({ isLogged: false });
  };

  handleSubmitLogin = (msg) => {
    this.setState({ isLogged: true, message: msg});
    this.props.history.push('/jokes');
  };


  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          {!this.state.isLogged && <h1 className="App-title">Authentication using JWTs</h1>}
          {this.state.isLogged && <h1 className="App-title">{this.state.message}</h1>}
        </header>
        {!this.state.isLogged && <div>
          <button className="App-button" onClick={this.handleOnClickLogin}>Login</button>
          <button className="App-button blue" onClick={this.handleOnClickRegister}>Register</button>
        </div>}
        {this.state.isLogged && <div>
          <button className="App-button red" onClick={this.handleOnClickLogout}>Logout</button>
        </div>}
        <Route path="/login" render={() => <UserLogin isLogin={true} onClickLogin={this.handleSubmitLogin}/>} />
        <Route path="/register" render={() => <UserLogin isLogin={false} onClickLogin={this.handleSubmitLogin}/>} />
        <Route path="/jokes" component={JokesList} />
      </div>
    );
  }
}

export default withRouter(App);
