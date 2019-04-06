import * as actionTypes from '../actions/actionTypes';

const initialState = {
    data: {
        address: '',
        lat: 55.75222,
        lng: 37.61556,
        zoom: 9,
        loading: false,
        error: null,
        new: true
    },
    loading: false,
    error: null,
    isFocused: true,
    url: null
};

const reducer = ( state = initialState, action ) => {
    if (action.type === actionTypes.GET_COORDS_SUCCESS) {
        return {
            ...state,
            data: {
                ...initialState.data,
                address: action.address,
                lat: action.lat,
                lng: action.lng,
                zoom: action.zoom,
                new: true
            },
        }
    }

    if (action.type === actionTypes.GET_COORDS_START) {
        return {
            ...state,
            data: {
                ...state.data,
                address: action.address,
                loading: true,
                error: null
            }
        }
    }

    if (action.type === actionTypes.GET_COORDS_FAILED) {
        return {
            ...state,
            data: {
                ...state.data,
                loading: false,
                error: action.error
            },
        }
    }

    if (action.type === actionTypes.NEW_COORDS_PUTTED) {
        return {
            ...state,
            data: {
                ...state.data,
                new: false
            },
        }
    }

    if (action.type === actionTypes.SENDING_LINK_SUCCESS) {
        return {
            ...state,
            loading: false,
            error: null,
            url: action.url
        }
    }

    if (action.type === actionTypes.SENDING_LINK_START) {
        return {
            ...state,
            loading: true,
            error: null,
            url: null
        }
    }

    if (action.type === actionTypes.SENDING_LINK_FAILED) {
        return {
            ...state,
            loading: false,
            error: action.error
        }
    }

    if (action.type === actionTypes.SET_ADDRESS) {
        return {
            ...state,
            data: {
                ...state.data,
                address: action.address
            },
            isFocused: true
        }
    }

    if (action.type === actionTypes.SET_MAP_COORDS) {
        return {
            ...state,
            data: {
                ...state.data,
                lat: action.lat,
                lng: action.lng
            },
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