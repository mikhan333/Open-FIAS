import * as actionTypes from '../actions/actionTypes';
import axios from "axios";
import { suggestServer } from "../actions/actionTypes";

const initialState = {
    address: '',
    suggestions: ['lol', 'kek']
};

const reducer = ( state = initialState, action ) => {
    if (action.type === actionTypes.SEND_ADDRESS) {
        let suggestions = [];
        axios.get(`${ suggestServer }?address=${ action.address }`).then( resp => { //TODO validate address
            suggestions = JSON.parse(resp.data.suggestions);
        });

        return {
            address: action.address,
            suggestions
        }
    }

    return state;
};

export default reducer;