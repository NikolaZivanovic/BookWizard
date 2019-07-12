import {
    INFORMATION_INPUT_SUCCESS,
} from './Information.actionTypes';

export const inputInformation = (information) => dispatch => {
    dispatch({
        type: INFORMATION_INPUT_SUCCESS,
        payload: information,
    });
};

