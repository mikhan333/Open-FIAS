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

function saveStatus(status) {
    return {
        type: actionTypes.SEND_LINK,
        status
    }
}
//TODO handle errors
export const askAddress = (coords) => {
    if (coords === null || coords.lat === null || coords.lng ===  null) {
        return saveData(actionTypes.ASK_ADDRESS, coords.lat, coords.lng, '')
    }
    return function (dispatch) {
        return axios.get(revGeocoderServer,
            {
                params: {
                    lat: coords.lat,
                    lon: coords.lng
                }
            }).then(resp => {
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

                dispatch(saveData(actionTypes.ASK_ADDRESS, coords.lat, coords.lng, address))
            });
    }
};

export const findPlace = (address) => {
    return function (dispatch) {
        return axios.get(geocoderServer, {
            params: {
                address
            }
        }).then( resp => {
            let coords;
            if (resp.data.features && resp.data.features[0].geometry) {
                coords = resp.data.features[0].geometry.coordinates;
            } else {
                coords = [null, null]
            }
            dispatch(saveData(actionTypes.FIND_PLACE, coords[0], coords[1], address))
        });
    }
};

export const sendLink = (address, coords) => {
    return function (dispatch) {
        return axios.post(notesServer, {
            address,
            lat: coords.lat,
            lon: coords.lng
        }).then( resp => {
            dispatch(saveStatus(resp.status))
        });
    }
};

export const clearData = () => {
    return {
        type: actionTypes.CLEAR_DATA
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