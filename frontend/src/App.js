import React, { Component } from 'react';

import CreateLink from './containers/CreateLink'
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <CreateLink/>
      </div>
    );
  }
}

export default App;
