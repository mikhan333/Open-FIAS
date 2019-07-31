import * as actionTypes from '../actions/actionTypes';

export const modeTypes = {
    fias: 'FIAS_MODE',
    map: 'MAP_MODE'
};

const initialState = {
    mode: modeTypes.map,
    loading: false,
    error: null,
    url: null,
    allowAddressInput: false,
    allowMarkerPut: false,
    mergingData: {
        isMerging: false,
        fiasAddress: null,
        osmAddress: null
    }
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

    if (action.type === actionTypes.MERGING) {
        return {
            ...state,
            mergingData: {
                isMerging: true,
                fiasAddress: action.fiasAddress,
                osmAddress: action.osmAddress
            }
        }
    }

    if (action.type === actionTypes.MERGED) {
        return {
            ...state,
            mergingData: initialState.mergingData
        }
    }

    if (action.type === actionTypes.CLEAR_DATA) {
        return {
            ...initialState,
            mode: state.mode
        }
    }

    return state;
};

export default reducer;