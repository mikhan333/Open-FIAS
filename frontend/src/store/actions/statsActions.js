import * as actionTypes from './actionTypes';
import axios from "axios";
import { statsServer } from "../serverURLs";

function getStatsSuccess(latestPoints, pointsCount, pointsPerDay, usersCount, usersTop) {
    return {
        type: actionTypes.GET_STATS_SUCCESS,
        latestPoints,
        pointsCount,
        pointsPerDay,
        usersCount,
        usersTop
    }
}

function getStatsStart() {
    return {
        type: actionTypes.GET_STATS_START
    }
}

function getStatsError(error) {
    return {
        type: actionTypes.GET_STATS_FAILED,
        error
    }
}

export const getStatistics = () => {
    return function (dispatch) {
        dispatch(getStatsStart());
        return axios.get(statsServer).then(resp => {
            dispatch(getStatsSuccess(
                resp.data.latest_points,
                resp.data.points_count,
                resp.data.points_count_days,
                resp.data.users_count,
                resp.data.users_top
            ));
        }).catch(error => {
            dispatch(getStatsError(error));
        });
    }
};

export const addPoint = (point) => {
    return {
        type: actionTypes.ADD_NEW_POINT_TO_STATS,
        point
    }
};