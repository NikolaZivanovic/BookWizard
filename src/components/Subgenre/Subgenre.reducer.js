import {
    ADD_SUBGENRE_SELECTED,
    SUBGENRE_INPUT_SUCCESS,
} from './Subgenre.actionTypes';
import _cloneDeep from 'lodash/cloneDeep';


export const INIT_STATE_SUBGENRE = {
    data: [],
    isAddSubgenreSelected: false,
};

export default function subgenreReducer (state = INIT_STATE_SUBGENRE, action) {
    if (action.type === SUBGENRE_INPUT_SUCCESS) {
        return subgenreInputSuccess(state, action.payload);
    } else if (action.type === ADD_SUBGENRE_SELECTED) {
        return {
            ...state,
            isAddSubgenreSelected: true,
        }
    } else {
        return state;
    }
}

const subgenreInputSuccess = (state, payload) => {
    const data = Number(payload);
    const newState = _cloneDeep(state);
    if (!Array.isArray(newState.data)) {
        newState.data = [];
    } else if (newState.data.includes(data)) {
        newState.data.splice( newState.data.indexOf(data), 1 )
    }
    else {
        newState.data.push(data);
    }
    return newState;
};

