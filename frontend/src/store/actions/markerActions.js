import * as actionTypes from './actionTypes';
import axios from "axios";
import { revGeocoderServer } from "../serverURLs";
import generateAddress from '../generateAddress'

const getAddressSuccess = (latitude, longitude, address) => {
    return {
        type: actionTypes.GET_ADDRESS_SUCCESS,
        address,
        lat: latitude,
        lng: longitude
    }
};

const getAddressStart = () => {
    return {
        type: actionTypes.GET_ADDRESS_START
    }
};

const getAddressFailed = (error) => {
    return {
        type: actionTypes.GET_ADDRESS_FAILED,
        error
    }
};

export const getAddress = (coords) => {
    if (!coords || !coords.lat || !coords.lng ) {
        return {
            type: actionTypes.GET_ADDRESS_FAILED,
            error: 'неверные координаты'
        }
    }
    return function (dispatch) {
        dispatch(getAddressStart());
        return axios.get(revGeocoderServer,
            {
                params: {
                    lat: coords.lat,
                    lon: coords.lng
                }
            }).then(resp => {
            if (!resp.data.results[0]) {
                dispatch(getAddressFailed('результатов не найдено'));
                return;
            }

            dispatch(getAddressSuccess(coords.lat, coords.lng, generateAddress(resp.data.results[0].address_details)))
        }).catch(error => {
            dispatch(getAddressFailed(error))
        });
    }
};

export const setMarkerCoords = (coords) => {
    return {
        type: actionTypes.SET_MARKER_COORDS,
        coords
    }
};