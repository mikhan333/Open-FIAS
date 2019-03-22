import React, { Component } from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import { connect } from "react-redux";

import Layout from './components/Layout'
import CreateLink from './containers/CreateLink'
import LoginPage from './containers/LoginPage'
import Profile from './containers/ProfilePage'
import * as actionCreators from "./store/actions/auth";
import './App.css';

class App extends Component {
    componentDidMount() {
        this.props.checkAuthServer(localStorage.getItem('username'));
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
        checkAuthServer: () => dispatch(actionCreators.checkAuth())
    }
};

export default connect(null, mapDispatchToProps)(App);