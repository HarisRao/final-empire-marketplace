import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { AuthedUser } from './reducers/authedUser';
import { Items } from './reducers/items';
import { Transactions } from './reducers/transactions';
import { Auctions } from './reducers/auctions';
import { Bids } from './reducers/bids';
import { Collections } from './reducers/collections';

export const ConfigureStore = () => {
    const store = createStore(combineReducers({
            authedUser: AuthedUser,
            items: Items,
            transactions: Transactions,
            auctions: Auctions,
            bids: Bids,
            collections: Collections
        }), applyMiddleware(thunk, logger)
    );
    return store;
}
