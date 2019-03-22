import * as actionTypes from './actionTypes';
import axios from "axios";
import { suggestServer } from "../serverURLs";

function suggestSuccess(address, suggestions) {
    return {
        type: actionTypes.SUGGEST_SUCCESS,
        address,
        suggestions
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
        return axios.get(suggestServer, {
            params: {
                address
            }
        }).then(resp => {
            const suggestions = resp.data.results.map((obj) => (obj.address));

            dispatch(suggestSuccess(address, suggestions));
        }).catch(error => {
            dispatch(suggestError(error));
        });
    }
};