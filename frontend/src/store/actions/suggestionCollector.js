import * as actionTypes from './actionTypes';
import axios from "axios";
import { suggestServer } from "./actionTypes";

function saveData(address, suggestions) {
    return {
        type: actionTypes.SEND_ADDRESS,
        address,
        suggestions
    }
}

export const sendAddress = (address) => {
    return function (dispatch) {
        return axios.get(`${ suggestServer }?address=${ address }`)
            .then( resp => { //TODO handle errors
                const suggestions = resp.data.results.map((obj) => (obj.address));

                dispatch(saveData(address, suggestions));
            });
    }
};