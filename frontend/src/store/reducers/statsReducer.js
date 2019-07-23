import * as actionTypes from '../actions/actionTypes';

const initialState = {
    loading: false,
    error: null,
    latestPoints: [],
    pointsCount: 0,
    pointsPerDay: [],
    usersCount: 0,
    usersTop: []
};

const reducer = ( state = initialState, action ) => {

    if (action.type === actionTypes.GET_STATS_SUCCESS) {
        return {
            ...state,
            pointsCount: action.pointsCount,
            pointsPerDay: action.pointsPerDay,
            usersCount: action.usersCount,
            usersTop: action.usersTop
        }
    }

    if (action.type === actionTypes.GET_LAST_POINTS_SUCCESS) {
        return {
            ...state,
            latestPoints: action.latestPoints,
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
            error: action.error,
        }
    }

    if (action.type === actionTypes.ADD_NEW_POINT_TO_STATS) {
        const latestPoints = state.latestPoints;
        if (latestPoints.length === 20) {
            latestPoints.pop();
        }
        return {
            ...state,
            latestPoints: [action.point, ...latestPoints],
            pointsCount: state.pointsCount + 1
        }
    }

    return state;
};

export default reducer;