import * as actionTypes from '../actions/actionTypes';

const initialState = {
    address: '',
    lat: null,
    lng: null,
    zoom: null,
    loading: false,
    error: null,
    new: false,
    isFocused: true
};

const reducer = ( state = initialState, action ) => {
    if (action.type === actionTypes.GET_COORDS_SUCCESS) {
        return {
            ...initialState,
            address: action.address,
            lat: action.lat,
            lng: action.lng,
            zoom: action.zoom,
            new: true
        }
    }

    if (action.type === actionTypes.GET_COORDS_START) {
        return {
            ...state,
            address: action.address,
            loading: true,
            error: null
        }
    }

    if (action.type === actionTypes.GET_COORDS_FAILED) {
        return {
            ...state,
            loading: false,
            error: action.error
        }
    }

    if (action.type === actionTypes.NEW_COORDS_PUTTED) {
        return {
            ...state,
            new: false
        }
    }

    if (action.type === actionTypes.SET_ADDRESS) {
        return {
            ...state,
            address: action.address,
            isFocused: true
        }
    }

    if (action.type === actionTypes.SET_MAP_COORDS) {
        return {
            ...state,
            lat: action.lat,
            lng: action.lng,
            isFocused: true
        }
    }

    if (action.type === actionTypes.UNFOCUS_INPUT) {
        return {
            ...state,
            isFocused: false
        }
    }

    if (action.type === actionTypes.CLEAR_DATA) {
        return initialState
    }

    return state;
};

export default reducer;