import * as actionTypes from './actionTypes';
import axios from "axios";
import { statsServer, lastPoints } from "../serverURLs";

function getStatsSuccess(pointsCount, pointsPerDay, usersCount, usersTop) {
    return {
        type: actionTypes.GET_STATS_SUCCESS,
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

function getLastPointsSuccess(latestPoints) {
    return {
        type: actionTypes.GET_LAST_POINTS_SUCCESS,
        latestPoints,
    }
}

function getLastPointsStart() {
    return {
        type: actionTypes.GET_STATS_START
    }
}

function getLastPointsError(error) {
    return {
        type: actionTypes.GET_STATS_FAILED,
        error
    }
}

export const getLastPoints = () => {
    return function (dispatch) {
        dispatch(getLastPointsStart());
        return axios.get(lastPoints).then(resp => {
            dispatch(getLastPointsSuccess(
                resp.data.latest_points,
            ));
        }).catch(error => {
            dispatch(getLastPointsError(error));
        });
    }
};

export const getStatistics = () => {
    return function (dispatch) {
        dispatch(getStatsStart());
        return axios.get(statsServer).then(resp => {
            dispatch(getStatsSuccess(
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