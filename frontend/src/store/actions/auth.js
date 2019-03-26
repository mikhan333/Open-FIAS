import * as actionTypes from './actionTypes';
import axios from "axios";
import { profileServer, logoutServer, checkAuthServer, anonimPointsServer } from "../serverURLs";

export const authStart = (username, avatar) => {
    return {
        type: actionTypes.AUTH_START,
        username,
        avatar
    }
};

export const authSuccess = (username, avatar, points) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        username,
        avatar,
        points
    }
};

export const authFailed = (error) => {
    return {
        type: actionTypes.AUTH_FAILED,
        error
    }
};

export const setNewPoints = (newPoints) => {
    return {
        type: actionTypes.SET_NEW_POINTS,
        newPoints
    }
};

export const logoutSuccess = () => {
    return {
        type: actionTypes.USER_LOGOUT,
    }
};

export const checkAuth = () => {
    return dispatch => {
        if (localStorage.getItem('username')) {
            dispatch(authSuccess(localStorage.getItem('username'), localStorage.getItem('avatar') || null));
        }
        axios.get(checkAuthServer, { withCredentials: true })
            .then(resp => {
                if (resp.data.authorization) {
                    if (resp.data.points === false) { //TODO delete if
                        dispatch(setNewPoints([]));
                    } else {
                        dispatch(setNewPoints(JSON.parse(resp.data.points)));
                    }
                    if(!localStorage.getItem('username') || localStorage.getItem('username') === '') {
                        dispatch(getProfileInfo());
                    }
                } else {
                    dispatch(authFailed('User are not authorized'));
                }
            })
            .catch(error => {
                console.log(error);
                localStorage.setItem('username', '');
                dispatch(authFailed(error));
            });
    }
};

export const getProfileInfo = () => {
    return dispatch => {
        dispatch(authStart(localStorage.getItem('username')));
        axios.get(profileServer, { withCredentials: true })
            .then(resp => {
                localStorage.setItem('username', resp.data.username);
                localStorage.setItem('avatar', resp.data.avatar);
                dispatch(authSuccess(resp.data.username,  resp.data.avatar, JSON.parse(resp.data.points)));
            })
            .catch(error => {
                localStorage.setItem('username', '');
                localStorage.setItem('avatar', '');
                dispatch(authFailed(error));
            });
    }
};

export const setAnonimPoints = (points) => {
    return (dispatch) => {
        console.log(points);
        axios.post(anonimPointsServer, { points });
        dispatch(setNewPoints([]));
    }
};

export const logout = () => {
    return dispatch => {
        axios.get(logoutServer, { withCredentials: true })
            .then(() => {
                localStorage.clear();
                dispatch(logoutSuccess());
                dispatch(checkAuth());
            })
            .catch(error => {
                dispatch(authFailed(error));
            });
    }
};
