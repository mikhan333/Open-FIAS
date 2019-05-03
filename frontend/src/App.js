import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { connect } from "react-redux";

import Layout from './components/Layout'
import CreateLink from './containers/CreateLink'
import Profile from './containers/ProfilePage'
import InfoProject from './containers/InfoProject'
import Statistics from './containers/Statistics'
import LanguageProvider from './components/LanguageProvider'
import * as actionCreators from "./store/actions/auth";
import './App.css';
import MainPage from "./containers/MainPage";

class App extends Component {
    componentDidMount() {
        this.props.checkAuthServer(localStorage.getItem('username'));
    }

    render() {
    return (
        <LanguageProvider>
            <div className="App">
                <Router>
                    <div>
                        <Switch>
                            <Route exact path='/add_point' component={ CreateLink } />
                            <Layout>
                                <Route exact path='/' component={ MainPage } />
                                <Route exact path='/profile' component={ Profile } />
                                <Route exact path='/about' component={ InfoProject } />
                                <Route exact path='/statistics' component={ Statistics } />
                            </Layout>
                        </Switch>
                    </div>

                </Router>
            </div>
        </LanguageProvider>
    );
  }
}

const mapDispatchToProps = dispatch => {
    return {
        checkAuthServer: () => dispatch(actionCreators.checkAuth())
    }
};

export default connect(null, mapDispatchToProps)(App);