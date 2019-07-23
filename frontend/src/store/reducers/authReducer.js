import * as actionTypes from '../actions/actionTypes';

const initialState = {
    username: '',
    avatar: null,
    points: [],
    newPoints: [],
    error: null,
    loading: false,
    language: "russian",
};

const reducer = ( state = initialState, action ) => {
    if (action.type === actionTypes.AUTH_START) {
        return {
            ...initialState,
            username: action.username,
            avatar: action.avatar,
            loading: true,
            newPoints: state.newPoints,
            language: state.language
        };
    }

    if (action.type === actionTypes.AUTH_SUCCESS) {
        return {
            ...initialState,
            username: action.username,
            avatar: action.avatar,
            points: action.points,
            newPoints: state.newPoints,
            language: state.language
        }
    }

    if (action.type === actionTypes.AUTH_FAILED) {
        return {
            ...initialState,
            error: action.error,
            language: state.language
        }
    }

    if (action.type === actionTypes.USER_LOGOUT) {
        return {
            ...initialState,
            language: state.language
        }
    }

    if (action.type === actionTypes.SET_NEW_POINTS) {
        return {
            ...state,
            newPoints: action.newPoints
        }
    }

    if (action.type === actionTypes.SET_LANGUAGE) {
        return {
            ...state,
            language: action.language
        }
    }

    return state;
};

export default reducer;