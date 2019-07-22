import {
    ADD_SUBGENRE_SELECTED,
    SUBGENRE_INPUT_SUCCESS,
} from './Subgenre.actionTypes';

export const INIT_STATE_SUBGENRE = {
    data: null,
    isDescriptionRequired: false,
    isAddSubgenreSelected: false,
};

export default function subgenreReducer (state = INIT_STATE_SUBGENRE, action) {
    if (action.type === SUBGENRE_INPUT_SUCCESS) {
        return {
            ...state,
            data: action.payload.subgenreId,
            isDescriptionRequired: action.payload.isDescReq,
        }
    } else if (action.type === ADD_SUBGENRE_SELECTED) {
        return {
            ...state,
            isAddSubgenreSelected: true,
        }
    } else {
        return state;
    }
}
