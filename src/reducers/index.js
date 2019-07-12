import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import initialData from './initState.reducer';
import { CLEAR_REDUCERS } from "../components/Common/Footer/ClearData.actionTypes";
import genreReducer from '../components/Genre/Genre.reducer'
import subgenreReducer from '../components/Subgenre/Subgenre.reducer';
import addSubgenreReducer from '../components/AddSubgenre/AddSubgenre.reducer';
import informationReducer from '../components/Information/Information.reducer';


const rootReducer = combineReducers( {
    initialData: initialData,
    genreReducer: genreReducer,
    subgenreReducer: subgenreReducer,
    addSubgenreReducer: addSubgenreReducer,
    informationReducer: informationReducer,
    routing: routerReducer,
} );

export default function ( state, action ) { // reset all reducers on Logout event
    if ( action.type === CLEAR_REDUCERS ) {
        state = undefined;
    }
    return rootReducer( state, action );
}

