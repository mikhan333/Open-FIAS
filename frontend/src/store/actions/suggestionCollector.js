import * as actionTypes from './actionTypes';

export const sendAddress = (address) => {
    return {
        type: actionTypes.SEND_ADDRESS,
        address
    };
};