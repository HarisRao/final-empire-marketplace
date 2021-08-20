import React, { useState } from 'react'
import Empirelogo from '../../images/empirelogo.png'
import cat4 from '../../images/cat4.jpg'
import roundedimage from '../../images/imageOnTrending4.jpeg'
import empirelogo from '../../images/empirelogo.png'
import {Button} from 'reactstrap'
import './details.css'
import Trending from '../Trending/trending'
import Select from 'react-select';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Modal, ModalBody } from 'reactstrap';
import {FacebookShareButton,LinkedinShareButton,TelegramShareButton,TwitterShareButton,WhatsappShareButton} from "react-share";
import {FacebookIcon,LinkedinIcon,TelegramIcon,TwitterIcon,WhatsappIcon} from "react-share";
import { useDispatch, useSelector } from 'react-redux'
import { itemSold, likeItem, newBidOnItem } from '../../redux/ActionCreators'
import web3 from '../../web3'
import Marketplace from '../../Marketplace';
import { useHistory } from 'react-router-dom'

const img=[roundedimage,roundedimage,roundedimage]

const options = [
    { value: '14 days', label: '14 days' },
    { value: '15 days', label: '15 days' },
    { value: '16 days', label: '16 days' },
  ];
  
function DetailsMiddle({match}){
    // constructor(){
    //     super()
    //     this.state = {
    const [selectedOption, setSelectedOption] = useState(null);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    
    //     };
    // }

    const toggle = () => {
        setDropdownOpen(!dropdownOpen);
    }
   
    const handleChange = selectedOption => {
        setSelectedOption(selectedOption);
    };
    const items = useSelector(s => s.items);
    const auctions = useSelector(s => s.auctions);
    const transactions = useSelector(s => s.transactions);
    const authedUser = useSelector(s => s.authedUser);
    const collections = useSelector(s => s.collections);
    const bids = useSelector(s => s.bids);
    const dispatch = useDispatch();
    const history = useHistory();
    var currentAuction, mintedTransaction, currentCollection;
    var item = {};
    console.log(items)
    item = items.items.filter(i => i.nft_id === match.params.token_id)[0];
    console.log(item);
    currentAuction = auctions.auctions.filter(a => a.item_id.nft_id === match.params.token_id && a.status);
    currentCollection = collections.collections.filter(a => a.address === match.params.collectible_id);
    if (item){
        mintedTransaction = transactions.transactions.filter(a => a.item_id === item._id && !a.seller);
    }  
    console.log(item, currentAuction, mintedTransaction);
    const [bnbAmt, setBnbAmt] = useState('0');
    const [bidLoading, setBidLoading] = useState(false);

    const like = () => {
        if (authedUser.authedUser.address){
            dispatch(likeItem(authedUser.authedUser.address, item._id));
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
    const bidOnItem = async () => {
        console.log(bnbAmt);
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
                        setBnbAmt('');
                    }
                    catch(e){
                        console.log(e);
                        setBidLoading(false);
                        alert('Failed!');
                    }
                }
                else{
                    alert(`pls place a higher bid! Current bid: ${web3.utils.fromWei(new_bid_price.toString())}` );
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
                    setBnbAmt('');
                }
                catch(e){
                    console.log(e);
                    setBidLoading(false);
                    alert('Failed!');
                }
            }
            else{
                alert(`place a higher bid! Minimum Required: ${web3.utils.fromWei(item.price)}`);
            }
        }
    }

    const buyItem = async () => {
        const prevOwner = item.owner._id;
        // setBuyLoading(true);
        if (authedUser.authedUser._id && prevOwner !== authedUser.authedUser._id){
            console.log("heree");
            try{
                setBidLoading(true);
                const result = await Marketplace.methods.BuyItem(item.marketplace_id).send({
                    from: authedUser.authedUser.address,
                    value: parseInt(item.price)
                });
                console.log(result);
                dispatch(itemSold(item._id, authedUser.authedUser.address, prevOwner))
                .then(res => {
                    setBidLoading(false);
                    history.push('/profile');
                });
            }
            catch(e){
                setBidLoading(false)
                console.log(e);
                alert('Failed!');
            }    
        }
        else{
            alert('You are the owner of this item, cant buy! OR are not logged in');
        }
    }

    if ((items.isLoading) | (auctions.isLoading) | collections.isLoading){
        return(
            <p>Loading!</p>
        );
    }
    else if (items.items.length === 0){
        return(
            <p>No Sale Items!</p>
        );
    }
    else if (currentCollection.length === 0){
        return(
            <p>No Collection with address {match.params.collectible_id} exists!</p>
        );
    }
    else if (!item){
        return(
            <p>No item with id {match.params.token_id} exists!</p>
        );        
    }
    else{
        return(
            <div>
                <p className="text-white display-3 ml-4 pb-5" id="marketplace-browse-font">{item.name}</p>
                <div className="row mx-4" style={{position:'relative'}}>
                    <img src={Empirelogo} alt="..." id="market-bg-logo"></img>
                    <div className="col-lg-5 col-12 px-0">
                        <div  style={{position:'relative'}}>
                            <img src={`${process.env.REACT_APP_BASE_URL}/${item.image_local}`} alt="..." style={{borderRadius:'3.25rem',width:"100%"}}></img>
                            <i className="fal fa-eye text-white" id="eye-icon" style={{fontSize:'22px'}}> 2034</i>
                            <i className={`${item.likedBy.includes(authedUser.authedUser._id) ? 'fas' : 'fal'} fa-heart text-white`} id="heart-icon" onClick={like}  style={{fontSize:'22px', cursor: 'pointer'}}> {` ${item.likedBy.length}`}</i>
                        </div>            
                    </div>

                    <div className="col-lg-7 col-12 mt-4 mt-lg-0 px-0 px-lg-3">
                        <div className="row">
                            <div className="col-sm-6 col-12 d-flex align-items-center">
                                <img src={item.owner.profilepic ? `${process.env.REACT_APP_BASE_URL}/${item.owner.profilepic}` : roundedimage} className="rounded-circle" style={{width:'15%', maxHeight: '56px'}}></img>
                                <span className="text-white ml-3"id="owned-font">Owned by <span id="person-name" className="h6">{item.owner.username ? item.owner.username : `${item.owner.address.substring(0,4)}...${item.owner.address.substring(38,42)}`}</span></span>
                            </div>
                            <div className="mt-3 mt-sm-0 py-2 py-lg-2 col-sm-6 col-12 d-flex justify-content-sm-end" >
                                <Button id="follow-btn">Follow +</Button>
                                
                                <Dropdown isOpen={dropdownOpen} toggle={toggle}>
                                    <DropdownToggle caret id="detail-share">
                                        <Button id="share-btn" className="ml-2">
                                            <i className="fal fa-share-alt mt-1"  style={{fontSize:'19px'}}></i>
                                        </Button>
                                    </DropdownToggle>
                                    <DropdownMenu  id="share-menu">
                                        <DropdownItem>
                                            <FacebookShareButton url={window.location.href}>
                                                <FacebookIcon size={22} round={true} ></FacebookIcon>
                                            </FacebookShareButton>
                                        </DropdownItem>
                                        <DropdownItem>
                                            <TelegramShareButton url={'https://www.google.com/'}>
                                                <TelegramIcon   size={22} round={true} ></TelegramIcon>
                                            </TelegramShareButton>
                                        </DropdownItem>
                                        <DropdownItem>
                                            <WhatsappShareButton url={window.location.href}>
                                                <WhatsappIcon  size={22} round={true} ></WhatsappIcon>
                                            </WhatsappShareButton>
                                        </DropdownItem>
                                        <DropdownItem>
                                            <LinkedinShareButton url={'https://www.google.com/'}>
                                                <LinkedinIcon  size={22} round={true} ></LinkedinIcon>
                                            </LinkedinShareButton>
                                        </DropdownItem>
                                        <DropdownItem>
                                            <TwitterShareButton url={'https://www.google.com/'}>
                                                <TwitterIcon  size={22} round={true} ></TwitterIcon>
                                            </TwitterShareButton>
                                        </DropdownItem>
                                    </DropdownMenu>
                                </Dropdown>
                                <Button id="msg-btn" className="ml-2"><i class="fal fa-comment-alt-lines" style={{fontSize:'19px'}}></i></Button>
                            </div>
                        </div>
                        <div id="content-bg" className="mt-3 px-3">
                            <div className="row pt-4 pb-3">
                                <div id="owned-font" className="col-sm-10 col-12 d-flex align-items-center">
                                    <span className="text-white mr-2 h4 mb-0" id="current-price">
                                        {item.status === '1' ? 'Current Price : ' : (
                                            (item.status === '2' && currentAuction[0].highestBid) ? 'Highest Bid : ' : 'Minimum Bid Price : '
                                        )}
                                        <img src={empirelogo} className="ml-2 h5 mb-0" alt="..." style={{width:'25px'}} ></img>
                                        <span id="current-price-font" className="h5 mb-0"> {item.status === '1' ? web3.utils.fromWei(item.price) : (
                                            (item.status === '2' && currentAuction[0].highestBid) ? web3.utils.fromWei(currentAuction[0].highestBid.price) : web3.utils.fromWei(item.price)
                                        )} (0.5 $)</span> 
                                    </span>
                                    
                                </div>
                                {item.status === '1' && (
                                    <div className="col-sm-2 col-12 mt-2 mt-sm-0 d-flex justify-content-sm-end">
                                        <Button id="buy-btn" onClick={buyItem}>Buy</Button>
                                    </div>
                                )}
                            </div>
                            <p className="text-white pb-4"  id="owned-font" >Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                            {item.status === '2' && (
                                <div className="pb-4">
                                    <form className="form-row">
                                        <div className="col-12 mt-2 mt-sm-0 col-sm-3 col-md-3 col-lg-3 d-flex justify-content-start"><label className="text-white d-flex align-items-center  mb-0" id="owned-font" style={{fontSize:'19px'}}>Place a bid</label></div>
                                        <div className="col-12 mt-2 mt-sm-0 col-sm-6 col-md-7 col-lg-6 d-flex justify-content-center"><input type="text" className="py-1 px-2 form-control mr-3 text-white" placeholder="Your Bid" value={bnbAmt} onChange={(e) => setBnbAmt(e.target.value)} style={{width:''}} id="input-bg"></input></div>
                                        <div className="col-12 mt-3 mt-sm-0 col-sm-3 col-md-2 col-lg-3 d-flex justify-content-start justify-content-sm-end" >
                                            <Button id="place-bid-btn" onClick={bidOnItem} style={{cursor: 'pointer'}}>Place Bid</Button>
                                        </div>
                                    </form>
                                </div>
                            )}
                        </div>

                        

                    </div>
                </div>
                <div className="row mx-4">
                    <div className="col-lg-5 col-12 px-0">
                        <div id="content-bg" className="mt-4 p-4">
                            <div className="row ">
                                <div className="col-10 col-sm-5">
                                <p className="text-white h4 mb-0" id="owned-font">Price History</p>
                                </div>
                                <div className="col-12 mt-3 mt-sm-0 col-sm-7 d-flex justify-content-sm-end">
                                <Select
                                    id="price-select"
                                    placeholder="Days Ago ..."
                                    value={selectedOption}
                                    onChange={handleChange}
                                    options={options}
                                />
                                </div>
                            </div>
                        <p className="text-white mt-4" id="owned-font">Avg Price <span id="person-name" className="ml-2 h5">EMPIRE 850.40</span></p>
                        </div>

                        <div id="content-bg" className="mt-4 py-4 px-3 p-sm-4">
                            <p className="text-white h4" id="owned-font">Details</p>
                            <div className="d-flex justify-content-between align-items-center mt-3">
                                <p className="text-white h6" id="owned-font">Contact Address</p>
                                <p className="text-white h6" id="details-address">{currentCollection[0].address.substring(0,5)}...{currentCollection[0].address.substring(38,42)}</p>
                            </div>
                            <div className="d-flex justify-content-between mt-1">
                                <p className="text-white h6" id="owned-font">Token ID</p>
                                <p className="text-white h6" id="details-address">{item.nft_id}</p>
                            </div>
                            <div className="d-flex justify-content-between mt-1">
                                <p className="text-white h6" id="owned-font">Date Created</p>
                                <p className="text-white h6" id="details-address">13/04/21</p>
                            </div>
                        </div>
                    </div>


                    {item.status === '2' && (
                        <>
                        <div className="col-lg-5 col-12 px-0 px-lg-4">

                            <div id="content-bg" className="mt-4 px-2 px-sm-4 pt-4 pb-5">
                                <p className="text-white text-center text-lg-left h4 mb-4" id="owned-font">Latest Bids</p>

                                {bids.bids.filter(b => b.auction_id === currentAuction[0]._id).map((bid, index)=>{
                                    return(
                                    <div className="row mt-3" key={index}>
                                        <div className="col-lg-2 col-md-4 col-sm-3 col-7 pr-0 d-flex justify-content-end">
                                            <img src={bid.bidder.profilepic ? `${process.env.REACT_APP_BASE_URL}/${bid.bidder.profilepic}` : roundedimage} className="rounded-circle" id="latest-img" ></img>
                                        </div>
                                        <div className="col-lg-10 col-md-6 col-sm-8 col-12 mt-2 mt-sm-0 pl-0 d-flex justify-content-center justify-content-sm-start align-items-center">
                                            <div className="ml-4 ml-lg-2 ">
                                                <span className="text-white" id="owned-font">Bid amount <span id="person-name">{web3.utils.fromWei(bid.price)} EMPIRE (0.43 $)</span></span>
                                                <p  id="owned-font" className="text-white"><span id="person-name">by {bid.bidder.username ? bid.bidder.username : `${bid.bidder.address.substring(0,6)}...${bid.bidder.address.substring(38,42)}`}</span> at 21/01/211 05:35 AM</p>       
                                            </div>
                                        </div>
                                    </div>)

                                })}
                            </div>

                            </div>
                            {currentAuction[0].highestBid && (

                            <div className="col-lg-2 col-12 pl-0 pr-0 pr-lg-3 mt-4">
                            <div id="highest-bid" className="px-2 pb-4 pt-4">
                                <div className="d-flex justify-content-center">
                                    <img src={empirelogo} id="bid-logo"></img>
                                </div>
                                <p className="text-center my-2" id="bid-font">Highest Bid</p>
                                <div id="content-bg" className="pb-2">
                                    <div className="d-flex justify-content-center">
                                        <img src={currentAuction[0].highestBid ? (currentAuction[0].highestBid.bidder.profilepic ? `${process.env.REACT_APP_BASE_URL}/${currentAuction[0].highestBid.bidder.profilepic}` : roundedimage) : roundedimage} className="mt-3 mb-2" id="bid-image" ></img>
                                    </div>
                                    <p id="bid-name" className="text-center text-white mb-0">{currentAuction[0].highestBid.bidder.username ? currentAuction[0].highestBid.bidder.username : `${currentAuction[0].highestBid.bidder.address.substring(0,5)}...${currentAuction[0].highestBid.bidder.address.substring(38, 42)}`}</p>
                                    <p  className="text-center mb-0 px-1" id="highest-bid-price">{web3.utils.fromWei(currentAuction[0].highestBid.price)} EMPIRE (0.48 $)</p>
                                </div>



                            </div>

                            </div>
                            )}


                        </>
                    )}
                </div>
                <div className="mx-4 mt-5 pt-5">
                    <h1 className="text-center pb-3" id="categories">More From This Collection</h1>
                    <Trending></Trending>
                </div>

                <Modal isOpen={bidLoading}>
                    <ModalBody style={{textAlign: 'center'}}>
                        <div className="create-loader"></div>
                        <h4>Status: Waiting for Tx to complete</h4>
                        <p>Dont close the window until the project is created!</p>                        
                    </ModalBody>
                </Modal>
            </div>
        )    
    }
}

export default DetailsMiddle