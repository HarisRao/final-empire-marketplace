import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import NFTMinter from '../../NFTMinter';
import { endAuctionRequest, itemMinted } from '../../redux/ActionCreators';
// import { Modal, ModalBody, ModalHeader, ModalFooter, Button } from 'reactstrap';
// import ListingModal from './listingModal';
import web3 from '../../web3';
import Marketplace from '../../Marketplace';
import CollectionMinter from '../../CollectionMinter';
import { useHistory } from 'react-router-dom';

export default function CollectibleItemCard({item, collectible_address}){
  const [status, setStatus] = useState('Not Minted');
  const [mintingLoading, setMintingLoading] = useState(false);
  const [modal, showModal] = useState(false);
  const [listingModal, showListingModal] = useState(false);
  const authedUser = useSelector(state => state.authedUser);
  const collections = useSelector(state => state.collections);
  const auctions = useSelector(state => state.auctions);
  const [endAuctionLoading, setEndAuctionLoading] = useState(false);

  const dispatch = useDispatch();
  const history = useHistory();

  const toggle = () => showModal(!modal);
  var currentAuction;
  currentAuction = auctions.auctions.filter(a => a.item_id.nft_id === item.nft_id && a.status);    

  const mintToken = async () => {
    let collection = collections.collections.filter(c => c._id === item.collection_id)[0];
    try{
        console.log('here');
        setMintingLoading(true);
        setStatus('Minting NFT');
        showModal(true);
        // document.getElementById('mint-modal-opener').click();
        // setMintingLoading(true)
        // const signature = await web3.eth.personal.sign(
        //     `I am signing my one-time nonce: ${authedUser.authedUser.nonce}`,
        //     authedUser.authedUser.address,
        //     '' // MetaMask will ignore the password argument here
        // );
        let minted;
        if (collection.address === process.env.REACT_APP_EMPIRE_TOKEN){
          minted = await NFTMinter.methods.createItem(item.token_uri).send({
            from: authedUser.authedUser.address
          });
        }
        else{
          minted = await CollectionMinter.methods.mintToken(item.collection_id, item.token_uri).send({
            from: authedUser.authedUser.address
          });
        }
        console.log(minted);
        console.log(minted.events.Transfer.returnValues[2]);
        dispatch(itemMinted(item._id, authedUser.authedUser.address, minted.events.Transfer.returnValues[2], minted.transactionHash))
        .then(res => {
            console.log('updating state')
            setMintingLoading(false);
            setStatus('NFT Minted');
        //     // history.push(`/token/${process.env.REACT_APP_TOKEN_ADDRESS}/${minted.events.Transfer.returnValues[2]}`)
        });    
    }
    catch(e){
        console.log("fuckkkkk", e);
        setMintingLoading(false);
        setStatus('');
        // document.getElementById('modal-closer').click();
        // setShowModal(false);
    }
  }
  const endAuction = async () => {
    console.log(currentAuction);
    if (currentAuction[0].highestBid){
      console.log(currentAuction, parseInt(item.marketplace_id))
      try{
          setEndAuctionLoading(true);
          // const signature = web3.eth.personal.sign(
          //     `I am signing my one-time nonce: ${authedUser.authedUser.nonce}`,
          //     authedUser.authedUser.address,
          //     '' // MetaMask will ignore the password argument here    
          // );
          var a = parseInt(item.marketplace_id);
          const r = await Marketplace.methods.EndAuction(a).send({
              from: authedUser.authedUser.address
          });
          console.log(r);
          dispatch(endAuctionRequest(item._id));
          setEndAuctionLoading(false);
      }
      catch(e){
          alert('Failed!')
          setEndAuctionLoading(false);
      }
    }
    else{
        alert('There is no bid on your Item currently!');
    }
  }

  return(
    <div className="col-12 col-md-6 col-lg-3 mt-3" >

      <div className="card" onClick={() => {if (item.minted && item.status !== "0"){history.push(`/detail/${collectible_address}/${item.nft_id}`)}}} id="main-card">
        <div >
          <img style={{minHeight: '250px', maxHeight: '250px'}} src={`${process.env.REACT_APP_BASE_URL}/${item.image_local}`} id="card-img" className="card-img-top" alt="..."></img>
        </div>
        <div className="card-body">
          <div>
          <div className="d-flex justify-content-between">
                <span className="card-title h5 pt-1 text-white" id="card-title-font">{item.name}</span>
                <span className="card-title" id="profile-heart-background"><i id="heart" className="fas fa-heart" style={{color:"#162e4a"}}></i></span>
            </div>
            {item.minted ? (
              <>
                {item.status === "0" && ( // not listed
                  <>
                    <p className="mb-1 text-left  text-white" id="bid-color">Status: <span id="blue-color"> Not Listed</span></p>
                    <div className="text-left pt-1" style={{height: '28px'}}>
                        <span className="card-title mb-0  text-white" id="bid-color">Owned by: <span id="blue-color" style={{cursor: 'pointer', position: 'absolute'}}> {item.owner.address.substring(0,5)}...{item.owner.address.substring(38,42)}</span></span>
                    </div>
                  </>
                )}
                {item.status === "1" && ( // on instant buy
                  <>
                    <p className="mb-1 text-left  text-white" id="bid-color">Status: <span id="blue-color"> Available for buying</span></p>
                    <div className="text-left pt-1">
                      <span className="card-title mb-0  text-white" id="bid-color">Owned by: <span id="blue-color" style={{cursor: 'pointer', position: 'absolute'}}> {item.owner.address.substring(0,5)}...{item.owner.address.substring(38,42)}</span></span>
                    </div>
                  </>
                )}
                {item.status === "2" && ( // on auction
                  <>
                  <p className="mb-1 text-left  text-white" id="bid-color">Status: <span id="blue-color"> Available for bidding</span></p>
                  <div className="text-left pt-1">
                    <span className="card-title mb-0  text-white" id="bid-color">Owned by: <span id="blue-color" style={{cursor: 'pointer', position: 'absolute'}}> {item.owner.address.substring(0,5)}...{item.owner.address.substring(38,42)}</span></span>
                  </div>
                </>
                )}
              </>
            ) : (
              <>
                <p className="mb-1 text-left  text-white" id="bid-color">Status: <span id="blue-color"> Not Minted</span></p>
                <div className="text-left pt-1" style={{height: '28px'}}>
                  <span className="card-title mb-0  text-white" id="bid-color">Owned by: <span id="blue-color" style={{cursor: 'pointer', position: 'absolute'}}> {item.owner.address.substring(0,5)}...{item.owner.address.substring(38,42)}</span></span>
                </div>
              </>
            )}
            {/* <p className="mb-1 text-left  text-white" id="bid-color">Price <span id="blue-color">0.122 Empire - 0.5$</span></p>
            <div className="d-flex justify-content-between">
                <div className="text-left pt-1">
                    <span className="card-title mb-0  text-white" id="bid-color">Best Bid :<span id="blue-color"> 0.122 Empire</span></span>
                </div>
                <div>
                    <Button className=" text-white" id="buy-btn">Buy</Button>
                </div>
            </div> */}
          </div>
        </div>
      {/* <Modal isOpen={modal} backdrop={false} id="mintingmodall" toggle={toggle} className="minting-modal">
        <ModalHeader toggle={toggle}>Modal title</ModalHeader>
        <ModalBody style={{textAlign: 'center'}}>
          {mintingLoading ? (
            <div className="create-loader"></div>
          ) : (
            <i className="far fa-check-circle" style={{color: 'green', fontSize: '52px'}}></i>
          )}
          <h4>Status: {status}</h4>
          {mintingLoading && (
          <p>Dont close the window until the project is created!</p>
          )}

        </ModalBody>
          
        <ModalFooter style={{display: mintingLoading  === true ? 'none' : 'flex'}}>
          <Button color="secondary" onClick={toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
      <Modal isOpen={endAuctionLoading}>
        <ModalBody style={{textAlign: 'center'}}>
          <div className="create-loader"></div>
          <h4>Status: Waiting for Tx to complete</h4>
          <p>Dont close the window until the project is created!</p>                        
        </ModalBody>
      </Modal>
      <ListingModal modal={listingModal} setShow={showListingModal} item={item} /> */}
      </div>
    </div>
  );
}