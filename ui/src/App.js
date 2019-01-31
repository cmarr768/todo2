import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Home from './Home/Home.component';
import { HashRouter, Route } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <HashRouter>
        <Route path='/' component={Home} />
      </HashRouter>
    );
  }
}

export default App;
