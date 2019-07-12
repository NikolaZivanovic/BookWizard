import {
    GENRE_INPUT_SUCCESS,
} from './Genre.actionTypes';

export const inputGenre = (genreId) => dispatch => {
    dispatch({
        type: GENRE_INPUT_SUCCESS,
        payload: genreId,
    });
};

