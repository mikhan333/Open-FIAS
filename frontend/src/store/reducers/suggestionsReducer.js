import * as actionTypes from '../actions/actionTypes';

const initialState = {
    address: '',
    suggestions: [],
    loading: false,
    error: null
};

const reducer = ( state = initialState, action ) => {

    if (action.type === actionTypes.SUGGEST_SUCCESS) {
        return {
            ...initialState,
            address: action.address,
            suggestions: action.suggestions
        }
    }

    if (action.type === actionTypes.SUGGEST_START) {
        return {
            ...state,
            loading: true
        }
    }

    if (action.type === actionTypes.SUGGEST_FAILED) {
        return {
            ...state,
            loading: false,
            error: action.error
        }
    }

    if (action.type === actionTypes.CLEAR_DATA) {
        return initialState
    }

    return state;
};

export default reducer;