import * as actionTypes from './actionTypes';
import axios from "axios";
import { infoServer, logoutServer } from "../serverURLs";

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
};

export const authSuccess = (username) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        username
    }
};

export const authFailed = (err) => {
    return {
        type: actionTypes.AUTH_FAILED,
        error: err,
    }
};

export const logoutSuccess = (error) => {
    return {
        type: actionTypes.USER_LOGOUT,
    }
};

export const auth = () => {
    return dispatch => {
        axios.get(infoServer, {withCredentials: true })
            .then(resp => {
                console.log(resp.data);
                localStorage.setItem('username', resp.data.name);

                if (!resp.data || resp.data.name === '') {
                    dispatch(authStart());
                }

                dispatch(authSuccess(resp.data.name));
            })
            .catch(error => {
                console.log(error);
                dispatch(authFailed(error));
            });
    }
};

export const logout = () => {
    return dispatch => {
        axios.get(logoutServer, {withCredentials: true})
            .then(resp => {
                console.log(resp.data);

                localStorage.clear();
                dispatch(logoutSuccess());
            })
            .catch(error => {
                // dispatch(authFailed(error));
            });
        
    }
};
