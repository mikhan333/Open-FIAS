import * as actionTypes from './actionTypes';
import axios from "axios";
import { statsServer } from "../serverURLs";

function getStatsSuccess(latest_points) {
    return {
        type: actionTypes.GET_STATS_SUCCESS,
        latest_points
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
            console.log(resp);
            dispatch(getStatsSuccess());
        }).catch(error => {
            dispatch(getStatsError(error));
        });
    }
};