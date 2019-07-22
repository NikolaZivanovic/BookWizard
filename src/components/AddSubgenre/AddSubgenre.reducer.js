import {
    ADD_SUBGENRE_INPUT_SUCCESS,
} from './AddSubgenre.actionTypes';


export const INIT_STATE_ADD_SUBGENRE = {
    data: {subgenreName: '', description: '', isRequired: false},
};

export default function addSubgenreReducer(state = INIT_STATE_ADD_SUBGENRE, action) {
    if (action.type === ADD_SUBGENRE_INPUT_SUCCESS) {
        return {
            ...state,
            data:
                {
                    subgenreName: action.payload.subgenreName,
                    description: action.payload.description,
                    isRequired: action.payload.isRequired,
                }

        };
    } else {
        return state;
    }
}


