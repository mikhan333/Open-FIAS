import React, { Component } from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import { connect } from "react-redux";

import Layout from './components/Layout'
import CreateLink from './containers/CreateLink'
import LoginPage from './containers/LoginPage'
import Profile from './containers/ProfilePage'
import './App.css';
import * as actionCreators from "./store/actions/auth";

class App extends Component {
    componentDidMount() {
        this.props.auth();
    }

    render() {
    return (
      <div className="App">
        <Router>
            <Layout>
              <Route exact path='/' component={ LoginPage } />
              <Route exact path='/addlink' component={ CreateLink } />
              <Route exact path='/profile' component={ Profile } />
            </Layout>
        </Router>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
    return {
        auth: () => dispatch(actionCreators.auth())
    }
};

export default connect(null, mapDispatchToProps)(App);