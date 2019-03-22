import * as actionTypes from '../actions/actionTypes';

const initialState = {
    username: '',
    points: [],
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
            points: action.points
        }
    }

    if (action.type === actionTypes.AUTH_FAILED) {
        return {
            ...state,
            error: action.error
        }
    }

    if (action.type === actionTypes.USER_LOGOUT) {
        return {
            ...initialState
        }
    }

    return state;
};

export default reducer;