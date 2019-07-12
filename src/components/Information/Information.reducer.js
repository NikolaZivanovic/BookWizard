import {
    INFORMATION_INPUT_SUCCESS,
} from './Information.actionTypes';


export const INIT_STATE_INFORMATION = {
    title: '',
    description: '',
    author: '',
    isbn: '',
    publisher: '',
    date: '',
    pages: '',
    format: '',
    edition: '',
    language: '',
};

export default function informationReducer (state = INIT_STATE_INFORMATION, action) {
    if (action.type === INFORMATION_INPUT_SUCCESS) {
        return {
            ...state,
            [Object.keys(action.payload)]: action.payload[Object.keys(action.payload)],
        };
    } else {
        return state;
    }
}
