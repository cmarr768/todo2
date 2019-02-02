import React, { Component } from 'react';
import logo from '../logo.svg';
import '../App.css';
import Oidc from 'oidc-client';

const oidcConfig = {
  authority: "http://localhost:5000",
  client_id: "js",
  redirect_uri: "http://localhost:3000/callback.html",
  response_type: "id_token token",
  scope: "openid profile api1",
  post_logout_redirect_uri: "http://localhost:3000/index.html",
};
const mgr = new Oidc.UserManager(oidcConfig)

class Home extends Component {
  constructor() {
    super();
    this.state = {
      isLoggedIn: false,
      profile: ''
    }
  }

  componentDidMount() {
    mgr.getUser().then(function (user) {
      debugger;
      if (user) {
        this.setState({ isLoggedIn: true, profile: user.profile });
      }
      else {
        this.setState({isLoggedIn: false, profile: 'not logged in '});
      }
    });

  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
        <div>profile: {this.state.profile}</div>
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default Home;
