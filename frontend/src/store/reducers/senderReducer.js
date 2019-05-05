import * as actionTypes from '../actions/actionTypes';

export const modeTypes = {
    fias: 'FIAS_MODE',
    map: 'MAP_MODE'
};

const initialState = {
    mode: modeTypes.fias,
    loading: false,
    error: null,
    url: null,
    allowAddressInput: false,
    allowMarkerPut: false
};

const reducer = ( state = initialState, action ) => {
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
            ...initialState,
            mode: state.mode,
            loading: true
        }
    }

    if (action.type === actionTypes.SENDING_LINK_FAILED) {
        return {
            ...state,
            loading: false,
            error: action.error
        }
    }

    if (action.type === actionTypes.SET_MODE) {
        return {
            ...initialState,
            mode: action.mode
        }
    }

    if (action.type === actionTypes.SET_ALLOW_ADDRESS_INPUT) {
        return {
            ...state,
            allowAddressInput: action.allowAddressInput
        }
    }

    if (action.type === actionTypes.SET_ALLOW_MARKER_PUT) {
        return {
            ...state,
            allowMarkerPut: action.allowMarkerPut
        }
    }

    return state;
};

export default reducer;