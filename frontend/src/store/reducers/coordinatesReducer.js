import * as actionTypes from '../actions/actionTypes';

const initialState = {
    latitude: null,
    longitude: null
};

const reducer = ( state = initialState, action ) => {
    if (action.type === actionTypes.SAVE_COORDINATES) {
        return {
            latitude: action.latitude,
            longitude: action.longitude
        }
    }

    return state;
};

export default reducer;