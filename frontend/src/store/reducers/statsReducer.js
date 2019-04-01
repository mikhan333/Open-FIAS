import * as actionTypes from '../actions/actionTypes';

const initialState = {
    loading: false,
    error: null,
    latest_points: []
};

const reducer = ( state = initialState, action ) => {

    if (action.type === actionTypes.GET_STATS_SUCCESS) {
        return {
            ...initialState,
            latest_points: action.latest_points
        }
    }

    if (action.type === actionTypes.GET_STATS_START) {
        return {
            ...state,
            loading: true
        }
    }

    if (action.type === actionTypes.GET_STATS_FAILED) {
        return {
            ...state,
            loading: false,
            error: action.error
        }
    }

    return state;
};

export default reducer;