import Constants from '../constants';
import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';


const initialState = {
    token: null,
    userId: null,
    error: null,
    loading: false,
    authRedirectPath: '/',
    cards: Constants,
};

const authStart = ( state, action ) => {
    return updateObject( state, { error: null, loading: true } );
};

const authSuccess = (state, action) => {
    return updateObject( state, {
        token: action.idToken,
        userId: action.userId,
        error: null,
        loading: false
     });
};

const authFail = (state, action) => {
    return updateObject( state, {
        error: action.error,
        loading: false
    });
};

const authLogout = (state, action) => {
    return updateObject(state, { token: null, userId: null });
};

const setAuthRedirectPath = (state, action) => {
    return updateObject(state, { authRedirectPath: action.path });
}

// const addOption = (state, action) => {
//   console.log('IN REDUCER, ADD_OPTION');
//   return updateObject(state, {cards: action});
// }
//
// const removeOption = (state, action) => {
//   return updateObject(state, {cards: action});
// }

// const optionChange = (state, action) => {
//   console.log('In option change');
//   console.log(updateObject(state, {cards: state.cards}));
//
//   return updateObject(state, {cards: state.cards});
// }


const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.AUTH_START: return authStart(state, action);
        case actionTypes.AUTH_SUCCESS: return authSuccess(state, action);
        case actionTypes.AUTH_FAIL: return authFail(state, action);
        case actionTypes.AUTH_LOGOUT: return authLogout(state, action);
        case actionTypes.SET_AUTH_REDIRECT_PATH: return setAuthRedirectPath(state, action);
        // case actionTypes.OPTION_CHANGE: return optionChange(state, action);
        default:
            return state;
    }
};

export default reducer;
