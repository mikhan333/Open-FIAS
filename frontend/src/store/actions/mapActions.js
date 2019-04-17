import * as actionTypes from './actionTypes';
import axios from "axios";
import { geocoderServer } from "../serverURLs";

const getCoordsSuccess = (latitude, longitude, address, zoom) => {
    return {
        type: actionTypes.GET_COORDS_SUCCESS,
        address,
        lat: latitude,
        lng: longitude,
        zoom
    }
};

const getCoordsFailed = (error) => {
    return {
        type: actionTypes.GET_COORDS_FAILED,
        error
    }
};

const getCoordsStart = (address) => {
    return {
        type: actionTypes.GET_COORDS_START,
        address
    }
};

export const getCoords = (address) => {
    return function (dispatch) {
        dispatch(getCoordsStart(address));
        return axios.get(geocoderServer, {
                params: {
                    address
                }
            }).then( resp => {
                if (resp.data.features && resp.data.features[0].geometry) {
                    const coords = resp.data.features[0].geometry.coordinates;
                    const rank = resp.data.features[0].rank || resp.data.features[0].properties.rank;
                    const zoom = rank < 11 ? rank + 6 : 17;
                    dispatch(getCoordsSuccess(coords[0], coords[1], address, zoom))
                } else {
                    dispatch(getCoordsFailed('места не найдены'))
                }
            }).catch(error => {
                dispatch(getCoordsFailed(error))
            });
    }
};

export const setAddress = (address) => {
    return {
        type: actionTypes.SET_ADDRESS,
        address
    }
};

export const setMapCoords = (coords) => {
    return {
        type: actionTypes.SET_MAP_COORDS,
        lat: coords.lat,
        lng: coords.lng
    }
};

export const unfocusInput = () => {
    return {
        type: actionTypes.UNFOCUS_INPUT
    }
};

export const clearData = () => {
    return {
        type: actionTypes.CLEAR_DATA
    }
};

export const putCoords = () => {
    return {
        type: actionTypes.NEW_COORDS_PUTTED
    }
};
