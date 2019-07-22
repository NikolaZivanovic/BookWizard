import {
    GENRE_INPUT_SUCCESS,
} from './Genre.actionTypes';

export const INIT_STATE_GENRE = {
    data: null,
};

export default function GenreReducer (state = INIT_STATE_GENRE, action) {
    if (action.type === GENRE_INPUT_SUCCESS) {
        return {
            ...state,
            data: action.payload
        }
    } else {
        return state;
    }
}
