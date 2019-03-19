import * as actionTypes from './actionTypes';
import axios from "axios";
import { notesServer, geocoderServer, revGeocoderServer } from "../serverURLs";

const saveData = (actionType, latitude, longitude, address) => {
    return {
        type: actionType,
        address,
        lat: latitude,
        lng: longitude
    }
};

const start = (actionType) => {
    return {
        type: actionType
    }
};

const failed = (actionType, error) => {
    return {
        type: actionType,
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
        dispatch(start(actionTypes.GET_ADDRESS_START));
        return axios.get(revGeocoderServer,
            {
                params: {
                    lat: coords.lat,
                    lon: coords.lng
                }
            }).then(resp => {
                if (!resp.data.results[0]) {
                    dispatch(failed(actionTypes.GET_ADDRESS_FAILED, 'результатов не найдень'));
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

                dispatch(saveData(actionTypes.GET_ADDRESS_SUCCESS, coords.lat, coords.lng, address))
            }).catch(error => {
                dispatch(failed(actionTypes.GET_ADDRESS_FAILED, error))
            });
    }
};

const getStart = (address) => {
    return {
        type: actionTypes.GET_COORDS_START,
        address
    }
};

export const getCoords = (address) => {
    return function (dispatch) {
        dispatch(getStart(address));
        return axios.get(geocoderServer, {
                params: {
                    address
                }
            }).then( resp => {
                if (resp.data.features && resp.data.features[0].geometry) {
                    const coords = resp.data.features[0].geometry.coordinates;
                    dispatch(saveData(actionTypes.GET_COORDS_SUCCESS, coords[0], coords[1], address))
                } else {
                    dispatch(failed(actionTypes.GET_COORDS_FAILED, 'места не найдены'))
                }
            }).catch(error => {
                dispatch(failed(actionTypes.GET_COORDS_FAILED, error))
            });
    }
};

export const sendLink = (address, coords) => {
    return function (dispatch) {
        dispatch(start(actionTypes.SENDING_LINK_START));
        return axios.post(notesServer, {
            address,
            lat: coords.lat,
            lon: coords.lng
        }).then( resp => {
            if (resp.status === 200) {
                dispatch(() => { return { type: actionTypes.SENDING_LINK_SUCCESS } })
            } else {
                dispatch(failed(actionTypes.SENDING_LINK_FAILED, 'плохой код ответа'))
            }

        }).catch(error => {
            dispatch(failed(actionTypes.SENDING_LINK_FAILED, error))
        });
    }
};



export const setAddress = (address) => {
    return {
        type: actionTypes.SET_ADDRESS,
        address
    }
};

export const setMarkerCoords = (coords) => {
    return {
        type: actionTypes.SET_MARKER_COORDS,
        coords
    }
};

export const unfocusInput = (isFocused) => {
    return {
        type: actionTypes.UNFOCUS_INPUT,
        isFocused
    }
};

export const clearData = () => {
    return {
        type: actionTypes.CLEAR_DATA
    }
};