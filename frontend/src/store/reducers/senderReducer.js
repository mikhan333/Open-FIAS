import * as actionTypes from '../actions/actionTypes';

export const modeTypes = {
    fias: 'FIAS_MODE',
    map: 'MAP_MODE'
};

const initialState = {
    mode: modeTypes.fias,
    loading: false,
    error: null,
    url: null
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
            mode: state.mode
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

    return state;
};

export default reducer;