import * as ActionTypes from './ActionTypes';
import web3 from '../web3';

export const logInRequest = (address) => dispatch => {
    return fetch(`${process.env.REACT_APP_BASE_URL}/users/${address}`)
    .then(res => res.json())
    .then(async res => {
      if (res.success) {
        var balance = await web3.eth.getBalance(address);
        res.user.balance = balance;
        return dispatch(login(res.user));
      }
      else{
        return dispatch(logout(null))
      };
    });
}
const login = (user) => ({
    type: ActionTypes.LOGGED_IN,
    payload: user
})
export const logout = (id) => ({
    type: ActionTypes.LOGGED_OUT,
    payload: id
})

const updateNonce = (user) => ({
  type: ActionTypes.UPDATE_NONCE,
  payload: user
})
export const createItemRequest = (name, desc, image, ipfs_json, ipfs_image, address, signature, category, imageType, collection_id) => (dispatch) => {
  var myHeaders = new Headers();

  var formdata = new FormData();
  formdata.append("nftImage", image, image.name);
  formdata.append("name", name);
  formdata.append("description", desc);
  formdata.append("image_ipfs", ipfs_image);
  formdata.append("token_uri", ipfs_json);
  formdata.append("signature", signature);
  formdata.append("address", address);
  formdata.append("category", category);
  formdata.append("nftType", imageType);
  formdata.append("collection_id", collection_id);

  var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: formdata,
  redirect: 'follow'
  };

  return fetch(`${process.env.REACT_APP_BASE_URL}/items/${address}`, requestOptions)
  .then(response => response.json())
  .then(async result => {
    if (result.success){
      var balance = await web3.eth.getBalance(result.user.address);
      result.user.balance = balance;
      dispatch(updateNonce(result.user));
      return dispatch(addNewItem(result.item));
    } 
    else{
      alert(result.status);
      return dispatch(addNewItemFailed(result.status));
    }
  })
}
const addNewItem = (item) => ({
  type: ActionTypes.ADD_ITEM,
  payload: item
})
const addNewItemFailed = (err) => ({
  type: ActionTypes.ADD_ITEM_FAILED
})

export const itemMinted = (id, address, nft_id, txHash) => dispatch => {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({address, id, nft_id, txHash});
  console.log(raw)
  var requestOptions = {
      method: 'PUT',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
  };
    
  return fetch(`${process.env.REACT_APP_BASE_URL}/items/minted`, requestOptions)
          .then(res => res.json())
          .then(res => {
              if (res.success) {
                dispatch(addTransactions([res.transaction]));
                return dispatch(replaceItem(res.item));
              }
              else{
                alert('Update Failed!');
              }
          })
}


export const replaceCollection = (item) => ({
  type: ActionTypes.REPLACE_COLLECTION,
  payload: item
})

const replaceItem = (item) => ({
  type: ActionTypes.REPLACE_ITEM,
  payload: item
})
const addTransactions = (transactions) => ({
  type: ActionTypes.ADD_TRANSACTIONS,
  payload: transactions
})

export const getMyItems = (address) => (dispatch) => {
  return fetch(`${process.env.REACT_APP_BASE_URL}/items/${address}`)
    .then(res => res.json())
    .then(res => {
      console.log(res);
      if (res.success){
        return dispatch(addItems(res.items));
      }
      else{
        return dispatch(addItemsFailed());
      }
    });
}
const addItems = (items) => ({
  type: ActionTypes.ADD_ITEMS,
  payload: items
})
const addItemsFailed = () => ({
  type: ActionTypes.ADD_ITEMS_FAILED
})

export const updateItem = (price, status, item_id, address, marketplace_id, txHash, enddate) => dispatch => {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({price, item_id, address, status, marketplace_id, txHash, enddate});
  console.log(raw)
  var requestOptions = {
      method: 'PUT',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
  };
    
  return fetch(`${process.env.REACT_APP_BASE_URL}/items/added_to_marketplace`, requestOptions)
          .then(res => res.json())
          .then(res => {
              if (res.success){
                if (status === "2"){
                  dispatch(addAuction(res.auction));
                }
                return dispatch(replaceItem(res.item));
              }
              else{
                alert('Update Failed!');
              }
          }) 
}
const addAuction = (auction) => ({
  type: ActionTypes.ADD_AUCTION,
  payload: auction
})

export const getAllAuctions = () => dispatch => {
  dispatch(auctionsLoading(true));
  return fetch(`${process.env.REACT_APP_BASE_URL}/auctions/`)
        .then(res => res.json())
        .then(res => {
          if (res.success){

            return dispatch(addAuctions(res.auctions));
          }
        });
}


export const getAllCollections = () => dispatch => {
  dispatch(collectionsLoading(true));
  return fetch(`${process.env.REACT_APP_BASE_URL}/collections/`)
        .then(res => res.json())
        .then(res => {
          if (res.success){
            return dispatch(addCollections(res.collections));
          }
        });
}

const collectionsLoading = (auc) => ({
  type: ActionTypes.COLLECTIONS_LOADING,
  payload: auc
})

const addCollections = (collArr) => ({
  type: ActionTypes.ADD_COLLECTIONS,
  payload: collArr
})

const auctionsLoading = (auc) => ({
  type: ActionTypes.AUCTIONS_LOADING,
  payload: auc
})

const addAuctions = (auc) => ({
  type: ActionTypes.ADD_AUCTIONS,
  payload: auc
})
export const getItemsOnSale = () => dispatch => {
  // dispatch(itemsLoading());
  return fetch(`${process.env.REACT_APP_BASE_URL}/items/`)
          .then(res => res.json())
          .then(res => {
            if (res.success){
              return dispatch(addItems(res.items))
            }
          });
}

export const setProfilePic = (content, publicAddress, signature, name, email, bio) => (dispatch) => {
  var myHeaders = new Headers();
  var formdata = new FormData();
  formdata.append("imageFile", content, content.name);
  formdata.append("signature", signature);
  formdata.append("address", publicAddress);
  formdata.append("username", name);
  formdata.append("email", email);
  formdata.append("bio", bio);

  var reqOptions = {
      method: 'PUT',
      "contentType": false,
      "processData": false,
      headers: myHeaders,
      body: formdata,
      redirect: 'follow'
  };

  return fetch(process.env.REACT_APP_BASE_URL + "/users/profpic/editprofilepic", reqOptions)
      .then(response => response.json())
      .then(async result => {
        console.log(result);
          if (result.success){
              const balance = await web3.eth.getBalance(result.user.address);
              result.user.balance = balance;
              return dispatch(login(result.user));
          }
          else{
            alert('Failed', result.status);
            // return dispatch(login(result.status));
          }
      })
}
export const editProfileRequest = (username, email, bio, address, signature) => (dispatch) => {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({username, email, address, bio, signature});
  console.log(raw)
  var requestOptions = {
      method: 'PUT',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
  };
    
  return fetch(`${process.env.REACT_APP_BASE_URL}/users/${address}`, requestOptions)
          .then(res => res.json())
          .then(async res => {
              if (res.success) {
                var balance = await web3.eth.getBalance(res.user.address);
                res.user.balance = balance;
                // dispatch(updateNonce(res.user));
                return dispatch(login(res.user));
              }
              else{
                alert('Update Failed!');
              }
          })
}
export const likeItem = (address, item_id) => dispatch => {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({address});
  console.log(raw)
  var requestOptions = {
      method: 'PUT',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
  };
    
  return fetch(`${process.env.REACT_APP_BASE_URL}/items/likeitem/${item_id}`, requestOptions)
          .then(res => res.json())
          .then(res => {
            console.log(res);
              if (res.success) {
                return dispatch(replaceItem(res.item));
              }
              else{
                alert('Update Failed!');
              }
          })
}
export const itemSold = (item_id, address, prevOwner) => dispatch => {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({item_id, address, prevOwner});
  console.log(raw);
  var requestOptions = {
      method: 'PUT',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
  };
    
  return fetch(`${process.env.REACT_APP_BASE_URL}/items/instant-sold`, requestOptions)
          .then(res => res.json())
          .then(res => {
              if (res.success) {
                dispatch(addTransactions([res.transaction]));
                return dispatch(replaceItem(res.item));
              }
              else{
                alert('Update Failed!');
              }
          })
}

export const getAllTransactions = () => dispatch => {
  return fetch(`${process.env.REACT_APP_BASE_URL}/transactions/`)
        .then(res => res.json())
        .then(res => {
          if (res.success){
            return dispatch(addTransactions(res.transactions));
          }
        });
}

export const getAllBids = () => dispatch => {
  return fetch(`${process.env.REACT_APP_BASE_URL}/bids/`)
  .then(res => res.json())
  .then(res => {
    if (res.success){
      return dispatch(addBids(res.bids))
    }
  });
}

const addBids = (bids) => ({
  type: ActionTypes.ADD_BIDS,
  payload: bids
})

export const newBidOnItem = (price, address, item_id) => dispatch => {
  var myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');

  var raw = JSON.stringify({address, item_id, price});
  console.log(raw)
  var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
  };
    
  return fetch(`${process.env.REACT_APP_BASE_URL}/bids/`, requestOptions)
        .then(response => response.json())
        .then(result => {
          if (result.success){
            console.log(result);
            alert('Bid Successfully! Youre now the highest bidder!')
            dispatch(replaceAuction(result.updated_auction));
            if (result.new_bid){
              return dispatch(addNewBid(result.bid));
            }
            else{
            return dispatch(replaceBid(result.bid));
            }
          } 
          else{
            alert(result.status);
            return dispatch(addNewItemFailed(result.status));
          }
        })
}
const addNewBid = bid => ({
  type: ActionTypes.ADD_BID,
  payload: bid
})

const replaceBid = bid => ({
  type: ActionTypes.REPLACE_BID,
  payload: bid
})

const replaceAuction = (auction) => ({
  type: ActionTypes.REPLACE_AUCTION,
  payload: auction
})

const addNewTransaction = (t) => ({
  type: ActionTypes.ADD_TRANSACTION,
  payload: t
});

export const endAuctionRequest = (item_id) => dispatch => {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({item_id});
  console.log(raw)
  var requestOptions = {
      method: 'PUT',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
  };
    
  return fetch(`${process.env.REACT_APP_BASE_URL}/items/auction-end`, requestOptions)
          .then(res => res.json())
          .then(res => {
              if (res.success) {
                dispatch(addNewTransaction(res.tranasaction));
                dispatch(replaceAuction(res.updated_auction));
                dispatch(replaceBid(res.updated_bid));
                return dispatch(replaceItem(res.updated_item));
              }
              else{
                alert('Update Failed!');
              }
          })
}

export const addCollectionRequest = (img, user_address, collection_address, nameCollection, symbol, royalty_percent) => (dispatch) => {
  var myHeaders = new Headers();

  var formdata = new FormData();
  formdata.append("logoImg", img, img.name);
  formdata.append("collection_address", collection_address);
  formdata.append("name", nameCollection);
  formdata.append("symbol", symbol);
  formdata.append("royalty_percent", royalty_percent);
  formdata.append("address", user_address);

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: formdata,
    redirect: 'follow'
  };

  return fetch(`${process.env.REACT_APP_BASE_URL}/collections/only-logo`, requestOptions)
    .then(response => response.json())
    .then(result => {
      console.log(result)
      if (result.success){
        return dispatch(addCollections([result.collection]));
      }
    })
    .catch(error => console.log('error', error));
}