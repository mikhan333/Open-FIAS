import * as actionTypes from './actionTypes';
import axios from "axios";
import { infoServer } from "../serverURLs";

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
};

export const authSuccess = (token, username) => {
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

export const auth = () => {
    return dispatch => {
        axios.get(infoServer)
            .then(resp => {
                console.log(document.cookie);

                if (!resp.data || resp.data.name === '') {
                    dispatch(authStart());
                }

                dispatch(authSuccess(resp.data.name));
            })
            .catch(error => {
                dispatch(authFailed(error));
            });
    }
};

