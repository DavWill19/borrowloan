import './App.css';
import React, { Component } from 'react';
import Main from './components/Main'
import { BrowserRouter } from 'react-router-dom';
import { createHashHistory } from 'history'

const history = createHashHistory()

class App extends Component {
  render() {
    return (
        <BrowserRouter>
          <div className="App">
            <Main />
          </div>
        </BrowserRouter>
    );
  }
}

export default App;
