import * as actionTypes from './actionTypes';
import axios from "axios";
import { revGeocoderServer } from "../serverURLs";

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
            const addressDetails = resp.data.results[0].address_details;

            let address = '';
            if (addressDetails.region) {
                address = `${addressDetails.region}`
            }
            if (addressDetails.locality && addressDetails.region !== addressDetails.locality) {
                address = `${address}, ${addressDetails.locality}`
            }
            if (addressDetails.street && addressDetails.street !== 'Unnamed Road') {
                address = `${address}, ${addressDetails.street}`
            }
            if (addressDetails.building) {
                address = `${address}, ${addressDetails.building}`
            }

            dispatch(getAddressSuccess(coords.lat, coords.lng, address))
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

export const clearData = () => {
    return {
        type: actionTypes.CLEAR_DATA
    }
};