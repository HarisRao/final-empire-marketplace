import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {Button, ModalFooter} from 'reactstrap'
import plus from '../../images/follow plus .png'
import imageOnTrending from '../../images/imageOnTrending1.jfif'
import { itemSold, likeItem, newBidOnItem } from '../../redux/ActionCreators';
import web3 from '../../web3';
import Marketplace from '../../Marketplace';
import { Modal, ModalBody, Input, InputGroup, InputGroupAddon, Label, InputGroupText, ModalHeader } from 'reactstrap';
import { useHistory } from 'react-router-dom';

function MarketplaceCards ({item}){
    const [color, setColor] = useState("#162e4a");
    const [show, setShow] = useState(false);
    const [bnbAmt, setBnbAmt] = useState('0');
    const [showBid, setShowBid] = useState(false);
    const [bidLoading, setBidLoading] = useState(false);

    const authedUser = useSelector(state => state.authedUser);
    const auctions = useSelector(state => state.auctions);
    const transactions = useSelector(state => state.transactions);
    const bids = useSelector(state => state.bids);
    const collections = useSelector(state => state.collections);
    const dispatch = useDispatch();
    const history = useHistory();



    const buyItem = async () => {
        const prevOwner = item.owner._id;
        // setBuyLoading(true);
        if (authedUser.authedUser._id && prevOwner !== authedUser.authedUser._id){
            console.log("heree");
            try{
                setShow(true);
                const result = await Marketplace.methods.BuyItem(item.marketplace_id).send({
                    from: authedUser.authedUser.address,
                    value: parseInt(item.price)
                });
                console.log(result);
                dispatch(itemSold(item._id, authedUser.authedUser.address, prevOwner))
                .then(res => {
                    setShow(false)
                });
            }
            catch(e){
                setShow(false)
                console.log(e);
                alert('Failed!');
            }    
        }
        else{
            alert('You are the owner of this item, cant buy! OR are not logged in');
        }
    }

    const prevBidAmount = () => {
        let prevPrice = 0;
        bids.bids.filter(bb => bb.auction_id === currentAuction[0]._id).forEach(b => {
            if (b.bidder._id === authedUser.authedUser._id && currentAuction[0]._id === b.auction_id && !b.withdrawn && !b.ended){
                prevPrice = parseInt(b.price);
            }
        })
        console.log(prevPrice);
        return prevPrice;
    }

    var currentAuction;
    var mintedTransaction;
    var collection;

    currentAuction = auctions.auctions.filter(a => a.item_id.nft_id === item.nft_id && a.status);    
    mintedTransaction = transactions.transactions.filter(a => a.item_id === item._id && !a.seller);
    collection = collections.collections.filter(a => a._id === item.collection_id)[0];

    const bidOnItem = async () => {
        console.log(bnbAmt)
        const price = web3.utils.toWei(bnbAmt);
        console.log(price);
        console.log(currentAuction[0]);
        if (authedUser.authedUser.address === item.owner.address){
            alert('You are the owner!');
        }
        else if (currentAuction[0].highestBid){
            if (currentAuction[0].highestBid.bidder !== authedUser.authedUser._id){
                const new_bid_price = prevBidAmount() + parseInt(price);
                console.log(new_bid_price);
                if (new_bid_price > parseInt(currentAuction[0].highestBid.price)){
                    console.log("Updating highest bid on item!");
                    try{
                        // const signature = web3.eth.personal.sign(
                        //     `I am signing my one-time nonce: ${authedUser.authedUser.nonce}`,
                        //     authedUser.authedUser.address,
                        //     '' // MetaMask will ignore the password argument here    
                        // );
                        setBidLoading(true);
                        const result = await Marketplace.methods.PlaceABid(item.marketplace_id).send({
                            from: authedUser.authedUser.address,
                            value: parseInt(price)
                        }); 
                        console.log(result);
                        dispatch(newBidOnItem(price, authedUser.authedUser.address, item._id));            
                        setBidLoading(false);
                        setShowBid(false);
                    }
                    catch(e){
                        console.log(e);
                        setBidLoading(false);
                        alert('Failed!');
                    }
                }
                else{
                    alert(`pls place a higher bid! Current bid: ${web3.utils.fromWei(new_bid_price)}` );
                }    
            }
            else{
                alert('Youre already highest bidder!');
            }
        }
        else{
            if (parseInt(price) > parseInt(item.price)){
                console.log("First bid on item!");
                try{
                    // const signature = web3.eth.personal.sign(
                    //     `I am signing my one-time nonce: ${authedUser.authedUser.nonce}`,
                    //     authedUser.authedUser.address,
                    //     '' // MetaMask will ignore the password argument here    
                    // );
                    setBidLoading(true);
                    const result = await Marketplace.methods.PlaceABid(item.marketplace_id).send({
                        from: authedUser.authedUser.address,
                        value: parseInt(price)
                    });
                    setBidLoading(false);
                    console.log(result);
                    dispatch(newBidOnItem(price, authedUser.authedUser.address, item._id));
                    setShowBid(false);
                }
                catch(e){
                    console.log(e);
                    setBidLoading(false);
                    alert('Failed!');
                }
            }
            else{
                alert(`place a higher bid! Current bid:${price}`);
            }
        }
    }

    const like = () => {
        if (authedUser.authedUser.address){
            dispatch(likeItem(authedUser.authedUser.address, item._id));
        }
    }

    console.log(collection);

    return(
        <>
        <div className="card" id="main-card">
            <img onClick={() => history.push(`/detail/${collection.address}/${item.nft_id}`)} src={`${process.env.REACT_APP_BASE_URL}/${item.image_local}`} style={{maxHeight: '250px', minHeight: '250px'}} id="card-img" className="card-img-top" alt="..."></img>
            <div className="card-body">
                <div className="d-flex justify-content-between">
                    <span className="card-title h5 pt-1 text-white" id="card-title-font">{item.name}</span>
                    <span className="card-title" id="heart-background"><i id="heart" onClick={like} className="fas fa-heart" style={{color: item.likedBy.includes(authedUser.authedUser._id) ? 'red' : '#162e4a'}}></i></span>
                </div>
                <>
                {item.status === "1" && ( // on instant buy
                  <>
                  <p className="mb-1 text-left  text-white" id="bid-color">Status: <span id="blue-color"> Available for buying</span></p>
                  <div className="d-flex justify-content-between">
                      <div className="text-left pt-1">
                          <span className="card-title mb-0  text-white" id="bid-color">Asking Price :<span id="blue-color"> {web3.utils.fromWei(item.price)} Empire</span></span>
                      </div>
                      <div style={{display:'flex',alignItems:'center'}}>
                          <Button className=" text-white" onClick={() => buyItem()} id="buy-btn">Buy</Button>
                      </div>
                  </div>
                  </>
                )}
                {item.status === "2" && ( // on auction
                  <>
                    <p className="mb-1 text-left  text-white" id="bid-color">Status: <span id="blue-color"> Available for bidding</span></p>
                    <div className="d-flex justify-content-between">
                        <div className="text-left pt-1">
                            <span className="card-title mb-0  text-white" id="bid-color">Best Bid :<span id="blue-color"> {web3.utils.fromWei(item.price)} Empire</span></span>
                        </div>
                        <div  style={{display:'flex',alignItems:'center'}}>
                            <Button className=" text-white" id="buy-btn" onClick={() => setShowBid(true)}>Bid Now</Button>
                        </div>
                    </div>
                </>
                )}
                </>
                <img src={imageOnTrending} alt="..." id="image-icon"></img>
                <img id="image-plus-icon" alt="..." src={plus} ></img>

            </div>
        </div>
        <Modal isOpen={show} className="instant-buy-modal">
            <ModalBody style={{textAlign: 'center'}}>
                <div className="create-loader"></div>
                <h4>Status: Waiting for Tx to complete</h4>
                <p>Dont close the window until the project is created!</p>                        
            </ModalBody>
        </Modal>
        
        <Modal isOpen={showBid} className="instant-buy-modal">
            {bidLoading ? (
                <>
            <ModalBody className="text-center">
                <div className="create-loader"></div>
            </ModalBody>
                
                </>
            ) : (<>
            <ModalHeader toggle={() => {setBnbAmt("0"); setShowBid(!showBid)}}>Bid on {item.name}</ModalHeader>
            <ModalBody>
                <Label style={{textAlign: 'left'}}>Enter Amount:</Label>
                <InputGroup>
                    <Input placeholder="BNB Amount" value={bnbAmt} onChange={(e) => setBnbAmt(e.target.value)} />
                    <InputGroupAddon addonType="append">
                    <InputGroupText>
                        <img src="https://cryptologos.cc/logos/binance-coin-bnb-logo.svg?v=013" style={{height: '20px'}} />
                    </InputGroupText>
                    </InputGroupAddon>
                </InputGroup>
            </ModalBody>
            <ModalFooter>
                <Button onClick={() => bidOnItem()}>Bid Now</Button>
            </ModalFooter> </>)}
        </Modal>
        </>
    )
}
export default MarketplaceCards