import * as ActionTypes from '../ActionTypes';

export const Collections = (state = {
    isLoading: false,
    errMess: null,
    collections: []
}, action) => {
        switch(action.type) {
            case ActionTypes.COLLECTIONS_LOADING:
                return {...state, isLoading: action.payload}
            case ActionTypes.ADD_COLLECTIONS:
                return {...state, isLoading: false, errMess: null, collections: state.collections.concat(action.payload)};
            case ActionTypes.ADD_COLLECTION:
                var a = state.collections;
                a.push(action.payload);
                return {...state, isLoading: false, errMess: null, collections: a};
            case ActionTypes.REPLACE_COLLECTION:
                var arr_new = [];
                console.log(state.collections, action.payload);
                state.collections.forEach(collection => {
                    console.log(collection)
                    if (collection._id === action.payload._id){
                        arr_new.push(action.payload);
                    }
                    else{
                        arr_new.push(collection);
                    }
                })
                return {...state, isLoading: false, errMess: null, collections: arr_new}
            default:
                return state;
        }
};