import {
    ADD_SUBGENRE_INPUT_SUCCESS,
} from './AddSubgenre.actionTypes';

export const inputAddSubgenre = (subgenre) => dispatch => {
    dispatch({
        type: ADD_SUBGENRE_INPUT_SUCCESS,
        payload: subgenre,
    });
};

