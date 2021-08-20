import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import {Button} from 'reactstrap'
import plus from '../../images/follow plus .png'
import imageOnTrending from '../../images/imageOnTrending1.jfif'
import { likeItem } from '../../redux/ActionCreators'
import web3 from '../../web3'

function AuctionCards({item}){
    // constructor(){
    //     super()
    //     this.state={
    //         color:"#162e4a",
    //         colorflag:false
    //     }
    // }
 
    // red=()=>{
    //     if(!this.state.flag){
    //     this.setState({
    //         color:"red",
    //         flag:true
    //     })}else{
    //     this.setState({
    //         color:"#162e4a",
    //         flag:false
    //     })}

    // }
    const history = useHistory();
    const dispatch = useDispatch();
    const authedUser = useSelector(s => s.authedUser);
    const collections = useSelector(s => s.collections);
    var collection = [];
    collection = collections.collections.filter(c => c._id === item.collection_id);
    const like = () => {
        if (authedUser.authedUser.address){
            dispatch(likeItem(authedUser.authedUser.address, item._id));
        }
    }

    return(
        <div id="auction-card">
            <div className="card" id="main-card">
                    <img src={`${process.env.REACT_APP_BASE_URL}${item.image_local}`} onClick={() => history.push(`/detail/${collection[0].address}/${item.nft_id}`)} style={{minHeight: '250px', maxHeight: '250px'}} id="card-img" className="card-img-top" alt="..."></img>
                    <div className="card-body">
                        <div className="d-flex justify-content-between">
                            <span className="card-title h5 pt-1 text-white" id="card-title-font">{item.name}</span>
                            <span className="card-title" id="heart-background-auction">
                                <i id="heart" onClick={like} className="fas fa-heart" style={{color:authedUser.authedUser.address ? (item.likedBy.includes(authedUser.authedUser._id) ? 'red' : '#162e4a') : '#162e4a'}}></i>
                            </span>
                        </div>
                        <p className="mb-1 text-left  text-white" id="bid-color">Price <span id="blue-color">{web3.utils.fromWei(item.price)} Empire - 0.5$</span></p>
                        <div className="d-flex justify-content-between">
                            <div className="text-left pt-1">
                                <span className="card-title mb-0  text-white" id="bid-color">Best Bid :<span id="blue-color"> 0.122 Empire</span></span>
                            </div>
                            <div>
                                <Button className=" text-white" id="buy-btn">Buy</Button>
                            </div>
                        </div>
                        <img src={imageOnTrending} alt="..." id="image-icon"></img>
                        <img id="image-plus-icon" alt="..." src={plus} ></img>

                    </div> 
                    
            </div>
            <div>
                <p className="h6 p-2 text-center">01d : 12h : 06m : 32s</p>
            </div>
        </div>
    )
}

export default AuctionCards