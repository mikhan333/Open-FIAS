import * as actionTypes from './actionTypes';
import axios from "axios";
import { profileServer, logoutServer, checkAuthServer, anonimPointsServer } from "../serverURLs";

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

export const authFailed = (error) => {
    return {
        type: actionTypes.AUTH_FAILED,
        error: error
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
            dispatch(authSuccess(localStorage.getItem('username')));
        }
        axios.get(checkAuthServer, {
            withCredentials: true,
        })
            .then(resp => {
                if (resp.data.authorization) {
                    if(!localStorage.getItem('username') || localStorage.getItem('username') === '') {
                        dispatch(getProfileInfo());
                        localStorage.setItem('justLogged', 'true')
                    }
                } else {
                    dispatch(authFailed('User are not authorized'));
                    if (resp.data.points) {
                        localStorage.setItem('hasAddedPoints', 'true');
                    }
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
        dispatch(authStart());
        axios.get(profileServer, {
            withCredentials: true,
        })
            .then(resp => {
                localStorage.setItem('username', resp.data.username);
                dispatch(authSuccess(resp.data.username,  JSON.parse(resp.data.points)));
            })
            .catch(error => {
                localStorage.setItem('username', '');
                dispatch(authFailed(error));
            });
    }
};

export const setAnonimPoints = () => {
    return () => {
        axios.get(anonimPointsServer, { withCredentials: true })
            .then(() => {
                localStorage.setItem('hasAddedPoints', 'false')
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
                dispatch(checkAuth());
            })
            .catch(error => {
                dispatch(authFailed(error));
            });
    }
};
