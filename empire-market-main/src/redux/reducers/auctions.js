import * as ActionTypes from '../ActionTypes';

export const Auctions = (state = {
    isLoading: false,
    errMess: null,
    auctions: []
}, action) => {
        switch(action.type) {
            case ActionTypes.AUCTIONS_LOADING:
                return {...state, isLoading: action.payload}
            case ActionTypes.ADD_AUCTIONS:
                return {...state, isLoading: false, errMess: null, auctions: state.auctions.concat(action.payload)};
            case ActionTypes.ADD_AUCTION:
                var a = state.auctions;
                a.push(action.payload);
                return {...state, isLoading: false, errMess: null, auctions: a};
            case ActionTypes.REPLACE_AUCTION:
                var arr_new = [];
                console.log(state.auctions, action.payload);
                state.auctions.forEach(auction => {
                    console.log(auction)
                    if (auction._id === action.payload._id){
                        arr_new.push(action.payload);
                    }
                    else{
                        arr_new.push(auction);
                    }
                })
                return {...state, isLoading: false, errMess: null, auctions: arr_new}
            default:
                return state;
        }
};