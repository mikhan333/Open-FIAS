import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import mapReducer from './store/reducers/mapReducer';
import markerReducer from './store/reducers/markerReducer';
import suggestionsReducer from './store/reducers/suggestionsReducer';
import authReducer from './store/reducers/authReducer'
import statsReducer from './store/reducers/statsReducer'
import senderReducer from './store/reducers/senderReducer'

const rootReducer = combineReducers({
    auth: authReducer,
    map: mapReducer,
    marker: markerReducer,
    suggest: suggestionsReducer,
    stats: statsReducer,
    sender: senderReducer
});

const logger = store => {
    return next => {
        return action => {
            console.log('[Middleware] Dispatching', action);
            const result = next(action);
            console.log('[Middleware] next state', store.getState());
            return result;
        }
    }
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(logger, thunk)));

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();