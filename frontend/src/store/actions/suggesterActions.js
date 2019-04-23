import * as actionTypes from './actionTypes';
import axios from "axios";
import { suggestServer } from "../serverURLs";

function suggestSuccess(address, suggestions, isMarkerControlShow) {
    return {
        type: actionTypes.SUGGEST_SUCCESS,
        address,
        suggestions,
        isMarkerControlShow
    }
}

function suggestStart() {
    return {
        type: actionTypes.SUGGEST_START
    }
}

function suggestError(error) {
    return {
        type: actionTypes.SUGGEST_FAILED,
        error
    }
}

export const getSuggestions = (address) => {
    if(address.length <= 1) {
        return {
            type: actionTypes.SUGGEST_SUCCESS,
            address,
            suggestions: []
        }
    }
    return function (dispatch) {
        dispatch(suggestStart());
        return axios.get(suggestServer, { params: { address }})
            .then(resp => {
                const suggestions = resp.data.results.map((obj) => (obj.address));
                let isMarkerControlShow = false;
                if (resp.data.results[0] && resp.data.results[0].address_details.building && resp.data.results[0].weight === 1) {
                    isMarkerControlShow = true
                }
                dispatch(suggestSuccess(address, suggestions, isMarkerControlShow));
            }).catch(error => {
                dispatch(suggestError(error));
            });
    }
};