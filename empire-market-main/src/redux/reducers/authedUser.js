import * as ActionTypes from '../ActionTypes';

export const AuthedUser = (state = {
    isLoading: false,
    errMess: null,
    authedUser: {}
}, action) => {
        switch(action.type) {
            case ActionTypes.LOGGED_IN:
                return {...state, isLoading: false, errMess: null, authedUser: action.payload}
            case ActionTypes.UPDATE_NONCE:
                return {...state, isLoading: false, errMess: null, authedUser: action.payload}
            case ActionTypes.LOGGED_OUT:
                return {...state, isLoading: false, errMess: null, authedUser: {}}    
            default:
                return state;
        }
};