import * as actionTypes from './actionTypes';
import axios from "axios";
import { notesServer, geocoderServer, revGeocoderServer } from "./actionTypes";

function saveData(actionType, latitude, longitude, address) {
    return {
        type: actionType,
        address,
        lat: latitude,
        lng: longitude
    }
}

function saveStatus(status) {
    return {
        type: actionTypes.SEND_LINK,
        status
    }
}

export const askAddress = (coords) => {
    return function (dispatch) {
        return axios.get(`${ revGeocoderServer }?lat=${ coords.lat }&lon=${ coords.lng }`)
            .then( resp => {
                const addressDetials = resp.data.results[0].address_details;

                let address = '';
                if (addressDetials.region) {
                    address = `${ addressDetials.region }`
                }
                if (addressDetials.locality && addressDetials.region !== addressDetials.locality) {
                    address = `${address}, ${ addressDetials.locality }`
                }
                if (addressDetials.street && addressDetials.street !== 'Unnamed Road') {
                    address = `${address}, ${ addressDetials.street }`
                }
                if (addressDetials.building) {
                    address = `${address}, ${ addressDetials.building }`
                }

                dispatch(saveData(actionTypes.ASK_ADDRESS, coords.lat, coords.lng, address))
            });
    }
};

export const findPlace = (address) => {
    return function (dispatch) {
        return axios.get(`${ geocoderServer }?address=${ address }`)
            .then( resp => {
                const coords = resp.data.features[0].geometry.coordinates;
                dispatch(saveData(actionTypes.FIND_PLACE, coords[0], coords[1], address))
            });
    }
};

export const sendLink = (address, coords) => {
    return function (dispatch) {
        return axios.get(`${ notesServer }?address=${ address }&lat=${ coords.lat }&lon=${ coords.lng }`)
            .then( resp => {
                dispatch(saveStatus(resp.status))
            });
    }
};