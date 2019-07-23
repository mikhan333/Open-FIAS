import * as actionTypes from './actionTypes';
import axios from "axios";
import { notesServer } from "../serverURLs";

const sendingStart = () => {
    return {
        type: actionTypes.SENDING_LINK_START
    }
};

const sendingFailed = (error) => {
    return {
        type: actionTypes.SENDING_LINK_FAILED,
        error
    }
};

const sendingSuccess = (url) => {
    return {
        type: actionTypes.SENDING_LINK_SUCCESS,
        url
    }
};

export const sendLink = (address, coords) => {
    return function (dispatch) {
        dispatch(sendingStart());
        return axios.post(notesServer, {
            address,
            lat: coords.lat,
            lon: coords.lng
        }, { withCredentials: true }).then( resp => {
            let url = null;
            if (resp.data.info && resp.data.info.id) {
                url = `https://master.apis.dev.openstreetmap.org/note/${ resp.data.info.id }`
            } else if (resp.data.changeset_id) {
                url = `https://master.apis.dev.openstreetmap.org/changeset/${ resp.data.changeset_id }`
            }
            dispatch(sendingSuccess(url));
        }).catch(error => {
            if (error.response && error.response.status === 400) {
                if (error.response.data === 'You done too many points') { //TODO change error handler
                    dispatch(sendingFailed({ message: 'Too many points' }))
                } else {
                    dispatch(sendingFailed({ message: 'некорректный адрес.' }))
                }
            } else {
                dispatch(sendingFailed(error))
            }
        });
    }
};

const switchMode = (mode) => {
    return {
        type: actionTypes.SET_MODE,
        mode
    }
};

const clear = () => {
    return {
        type: actionTypes.CLEAR_DATA
    }
};

export const setMode = (mode) => {
    return function (dispatch) {
        dispatch(switchMode(mode));
        dispatch(clear())
    }
};

const merged = () => {
    return {
        type: actionTypes.MERGED
    }
};

export const merge = (isMerged, address, coords) => {
    return function (dispatch) {
        if (isMerged) {
            dispatch(sendLink(address, coords));
        }
        dispatch(merged())
    }
};