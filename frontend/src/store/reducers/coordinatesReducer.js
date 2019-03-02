import * as actionTypes from '../actions/actionTypes';

const initialState = {
    coords: {
        address: '',
        lat: null,
        lng: null
    },
    markerCoords: {
        address: '',
        lat: null,
        lng: null
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

    return state;
};

export default reducer;