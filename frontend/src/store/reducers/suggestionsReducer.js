import * as actionTypes from '../actions/actionTypes';

const initialState = {
    address: '',
    suggestions: []
};

const reducer = ( state = initialState, action ) => {
    if (action.type === actionTypes.SEND_ADDRESS) {
        return {
            address: action.address,
            suggestions: action.suggestions
        }
    }

    return state;
};

export default reducer;