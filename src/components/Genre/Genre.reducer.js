import {
    GENRE_INPUT_SUCCESS,
} from './Genre.actionTypes';
import _cloneDeep from 'lodash/cloneDeep';

export const INIT_STATE_GENRE = {
    data: [],
};

export default function GenreReducer (state = INIT_STATE_GENRE, action) {
    if (action.type === GENRE_INPUT_SUCCESS) {
        return genreInputSuccess(state, action.payload);
    } else {
        return state;
    }
}

const genreInputSuccess = (state, payload) => {
    const newState = _cloneDeep(state);
    if (!Array.isArray(newState.data)) {
        newState.data = [];
    } else if (newState.data.includes(payload)) {
        newState.data.splice( newState.data.indexOf(payload), 1 )
    }
    else {
        newState.data.push(...payload);
    }
    return newState;
};

