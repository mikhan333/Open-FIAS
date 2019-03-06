import * as actionTypes from '../actions/actionTypes';

const initialState = {
    coords: {
        address: '',
        lat: 55.75222,
        lng: 37.61556
    },
    markerCoords: {
        address: '',
        lat: null,
        lng: null,
    },
    status: null
};

const reducer = ( state = initialState, action ) => {

    if (action.type === actionTypes.ASK_ADDRESS) {
        return {
            ...state,
            markerCoords: {
                address: action.address,
                lat: action.lat,
                lng: action.lng
            },
        }
    }

    if (action.type === actionTypes.FIND_PLACE) {
        return {
            ...state,
            coords: {
                address: action.address,
                lat: action.lat,
                lng: action.lng
            },
        }
    }

    if (action.type === actionTypes.SEND_LINK) {
        return {
            ...state,
            status: action.status
        }
    }

    if (action.type === actionTypes.CLEAR_DATA) {
        return initialState
    }

    if (action.type === actionTypes.SET_ADDRESS) {
        return {
            ...state,
            coords: {
                ...state.coords,
                address: action.address
            }
        }
    }

    if (action.type === actionTypes.SET_MARKER_COORDS) {
        return {
            ...state,
            markerCoords: {
                address: 'Подождите...',
                lat: action.coords.lat,
                lng: action.coords.lng
            }
        }
    }

    return state;
};

export default reducer;