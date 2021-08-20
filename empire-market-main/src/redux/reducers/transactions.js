import * as ActionTypes from '../ActionTypes';

export const Transactions = (state = {
    isLoading: false,
    errMess: null,
    transactions: []
}, action) => {
        switch(action.type) {
            case ActionTypes.ADD_TRANSACTIONS:
                return {...state, isLoading: false, errMess: null, transactions: state.transactions.concat(action.payload)};
            case ActionTypes.ADD_TRANSACTION:
                var a = state.transactions;
                a.push(action.payload);
                return {...state, isLoading: false, errMess: null, transactions: a};
            case ActionTypes.REPLACE_TRANSACTION:
                var arr_new = [];
                console.log(state.transactions, action.payload);
                state.transactions.forEach(itemm => {
                    console.log(itemm)
                    if (itemm._id === action.payload._id){
                        arr_new.push(action.payload);
                    }
                    else{
                        arr_new.push(itemm);
                    }
                })
                return {...state, isLoading: false, errMess: null, transactions: arr_new}

            default:
                return state;
        }
};