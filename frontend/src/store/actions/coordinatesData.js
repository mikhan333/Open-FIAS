import * as actionTypes from './actionTypes';

export const saveCoordinates = (coords) => {
    return {
        type: actionTypes.SAVE_COORDINATES,
        latitude: coords.lat,
        longitude: coords.lng
    };
};