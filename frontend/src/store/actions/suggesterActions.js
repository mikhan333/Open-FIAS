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

function disallowMarkerPut() {
    return {
        type: actionTypes.SET_ALLOW_MARKER_PUT,
        allowMarkerPut: false
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

                if (!(resp.data.results[0]
                    && resp.data.results[0].address_details.building
                    && resp.data.results[0].weight === 1
                    && resp.data.results[0].address === address)
                ) {
                    dispatch(disallowMarkerPut())
                }

                dispatch(suggestSuccess(address, suggestions));
            }).catch(error => {
                dispatch(suggestError(error));
            });
    }
};