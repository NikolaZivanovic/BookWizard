import {
    ADD_SUBGENRE_SELECTED,
    SUBGENRE_INPUT_SUCCESS,
} from './Subgenre.actionTypes';

export const inputSubgenre = (subgenreId, isDescReq) => dispatch => {
    dispatch({
        type: SUBGENRE_INPUT_SUCCESS,
        payload: {subgenreId, isDescReq},
    });
};

export const addSubgenreSelected = () => dispatch => {
    dispatch({
        type: ADD_SUBGENRE_SELECTED,
    })
};
