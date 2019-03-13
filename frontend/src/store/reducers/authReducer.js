import * as actionTypes from '../actions/actionTypes';

const initialState = {
    username: null,
    error: null,
    loading: false,
};

const reducer = ( state = initialState, action ) => {
    if (action.type === actionTypes.AUTH_START) {
        return {
            ...initialState,
            loading: true,
        };
    }

    if (action.type === actionTypes.AUTH_SUCCESS) {
        return {
            ...initialState,
            username: action.username,
        }
    }

    if (action.type === actionTypes.AUTH_FAILED) {
        return {
            ...initialState,
            error: action.error
        }
    }

    return state;
};

export default reducer;