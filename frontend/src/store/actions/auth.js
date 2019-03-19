import * as actionTypes from './actionTypes';
import axios from "axios";
import { infoServer, logoutServer } from "../serverURLs";

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
};

export const authSuccess = (username, points) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        username,
        points
    }
};

export const authFailed = (err) => {
    return {
        type: actionTypes.AUTH_FAILED,
        error: err,
    }
};

export const logoutSuccess = () => {
    return {
        type: actionTypes.USER_LOGOUT,
    }
};

export const auth = () => {
    return dispatch => {
        if (localStorage.getItem('username')) {
            dispatch(authSuccess(localStorage.getItem('username')));
        }
        axios.get(infoServer, {
            withCredentials: true,
            crossDomain: true
        })
            .then(resp => {
                console.log(resp.data);
                localStorage.setItem('username', resp.data.username);
                dispatch(authSuccess(resp.data.username,  JSON.parse(resp.data.points)));
            })
            .catch(error => {
                console.log(error);
                localStorage.setItem('username', '');
                dispatch(authFailed(error));
            });
    }
};

export const logout = () => {
    return dispatch => {
        axios.get(logoutServer, { withCredentials: true })
            .then(resp => {
                console.log(resp.data);
                localStorage.clear();
                dispatch(logoutSuccess());
            })
            .catch(error => {
                dispatch(authFailed(error));
            });
    }
};
