import { CLEAR_REDUCERS } from "./ClearData.actionTypes";

export const clearReducers = () => dispatch => {
    dispatch({
        type: CLEAR_REDUCERS,
    });
};
