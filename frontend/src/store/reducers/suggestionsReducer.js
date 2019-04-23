import * as actionTypes from '../actions/actionTypes';

const initialState = {
    address: '',
    suggestions: [],
    loading: false,
    error: null,
    isMarkerControlShow: false
};

const reducer = ( state = initialState, action ) => {

    if (action.type === actionTypes.SUGGEST_SUCCESS) {
        return {
            ...initialState,
            address: action.address,
            suggestions: action.suggestions,
            isMarkerControlShow: action.isMarkerControlShow
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

    return state;
};

export default reducer;