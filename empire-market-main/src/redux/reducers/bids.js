import * as ActionTypes from '../ActionTypes';

export const Bids = (state = {
    isLoading: false,
    errMess: null,
    bids: []
}, action) => {
        switch(action.type) {
            case ActionTypes.ADD_BIDS:
                return {...state, isLoading: false, errMess: null, bids: state.bids.concat(action.payload)};
            case ActionTypes.ADD_BID:
                var a = state.bids;
                a.push(action.payload);
                return {...state, isLoading: false, errMess: null, bids: a};
            case ActionTypes.REPLACE_BID:
                var arr_new = [];
                console.log(state.bids, action.payload);
                state.bids.forEach(bid => {
                    console.log(bid)
                    if (bid._id === action.payload._id){
                        arr_new.push(action.payload);
                    }
                    else{
                        arr_new.push(bid);
                    }
                })
                return {...state, isLoading: false, errMess: null, bids: arr_new}
            case ActionTypes.BIDS_WITHDRAWN:
                var arr_new = [];
                console.log(state.bids, action.payload);
                state.bids.forEach(bid => {
                    console.log(bid)
                    if (bid.bidder.address === action.payload.address && bid.item_id === action.payload.item_id && !bid.withdrawn){
                        var x = bid;
                        x.withdrawn = true;
                        arr_new.push(x);
                    }
                    else{
                        arr_new.push(bid);
                    }
                })
                return {...state, isLoading: false, errMess: null, bids: arr_new};
            default:
                return state;
        }
};