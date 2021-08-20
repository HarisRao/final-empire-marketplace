import * as ActionTypes from '../ActionTypes';

export const Items = (state = {
    isLoading: false,
    errMess: null,
    items: []
}, action) => {
        switch(action.type) {
            case ActionTypes.ITEMS_LOADING:
                return {...state, isLoading: true};
            case ActionTypes.LOAD_ITEMS:
                return {...state, isLoading: false, errMess: null, items: action.payload};
            case ActionTypes.ADD_ITEM:
                var a = state.items;
                a.push(action.payload);
                return {...state, isLoading: false, errMess: null, items: a};
            // case ActionTypes.LOGGED_OUT:
            //     return {...state, isLoading: false, errMess: null, items: []};
            case ActionTypes.ADD_ITEMS:
                return {...state, isLoading: false, errMess: null, items: state.items.concat(action.payload)};
            case ActionTypes.REPLACE_ITEM:
                var arr_new = [];
                console.log(state.items, action.payload);
                state.items.forEach(itm => {
                    console.log(itm)
                    if (itm._id === action.payload._id){
                        arr_new.push(action.payload);
                    }
                    else{
                        arr_new.push(itm);
                    }
                })
                return {...state, isLoading: false, errMess: null, items: arr_new}
            case ActionTypes.LOGGED_OUT:
                let new_arr = [];
                state.items.forEach(it => {
                    if (it.owner._id !== action.payload){
                        new_arr.push(it);
                    }
                    else{
                        if (it.status !== "0"){
                            new_arr.push(it);
                        }
                    }
                })
                return {...state, isLoading: false, errMess: null, items: new_arr}
            default:
                return state;
        }
};