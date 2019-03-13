import React, { Component } from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';

import Layout from './components/Layout'
import CreateLink from './containers/CreateLink'
import LoginPage from './containers/LoginPage'
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
            <Layout>
              <Route exact path='/' component={ LoginPage } />
              <Route exact path='/addlink' component={ CreateLink } />
            </Layout>
        </Router>
      </div>
    );
  }
}

export default App;
