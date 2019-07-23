import * as actionTypes from '../actions/actionTypes';

const initialState = {
    address: '',
    lat: null,
    lng: null,
    loading: false,
    error: null
};

const reducer = ( state = initialState, action ) => {

    if (action.type === actionTypes.GET_ADDRESS_SUCCESS) {
        return {
            ...initialState,
            address: action.address,
            lat: action.lat,
            lng: action.lng
        }
    }

    if (action.type === actionTypes.GET_ADDRESS_START) {
        return {
            ...state,
            loading: true
        }
    }

    if (action.type === actionTypes.GET_ADDRESS_FAILED) {
        return {
            ...state,
            loading: false,
            error: action.error
        }
    }

    if (action.type === actionTypes.SET_MARKER_COORDS) {
        return {
            ...initialState,
            lat: action.coords.lat,
            lng: action.coords.lng,
            loading: true
        }
    }

    if (action.type === actionTypes.CLEAR_DATA) {
        return initialState
    }

    return state;
};

export default reducer;