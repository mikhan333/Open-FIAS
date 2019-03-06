import * as actionTypes from './actionTypes';
import axios from "axios";
import { suggestServer } from "../serverURLs";

function saveData(address, suggestions) {
    return {
        type: actionTypes.SEND_ADDRESS,
        address,
        suggestions
    }
}
//TODO handle errors
export const sendAddress = (address) => {
    return function (dispatch) {
        return axios.get(suggestServer, {
            params: {
                address
            }
        }).then(resp => {
            const suggestions = resp.data.results.map((obj) => (obj.address));

            dispatch(saveData(address, suggestions));
        });
    }
};