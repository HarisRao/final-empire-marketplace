import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import web3 from '../../web3';
import { addCollectionRequest, createItemRequest, itemMinted, replaceCollection, updateItem } from '../../redux/ActionCreators';
import NFTMinter from '../../NFTMinter';
import CreateModal from './createModal';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Label, InputGroup, InputGroupAddon, InputGroupText, Input } from 'reactstrap';
import Marketplace from '../../Marketplace';
import { useHistory } from 'react-router-dom';
import ImgPlaceholder from '../../images/img-placeholder.png'
import Empirelogo from '../../images/empirelogo.png'
import CollectionMinter from '../../CollectionMinter';

const crypto = require('crypto');


export default function CreateCollectionMiddle(){
    const authedUser = useSelector(state => state.authedUser);
    // const [selectedCateg, setSelectedCateg] = useState('');
    const [name, setName] = useState('');
    const [desc, setDesc] = useState('');
    const [royalty, setRoyalty] = useState('');
    const [symbol, setSymbol] = useState('');
    const [featuredImage, setFeaturedImage] = useState('');
    const [bannerImage, setBannerImage] = useState('');
    const [logoImage, setLogoImage] = useState('');
    const [status, setStatus] = useState('Not Created');
    const [createModal, setCreateModal] = useState(false);

    const history = useHistory();

    const dispatch = useDispatch();

    const featuredFileChangeHandler = (e) => {
        if (e.target.files.length > 0){
            console.log(e.target.files[0])
            setFeaturedImage(e.target.files[0]);
        }
    }
    const bannerFileChangeHandler = (e) => {
        if (e.target.files.length > 0){
            console.log(e.target.files[0])
            setBannerImage(e.target.files[0]);
        }
    }

    const logoFileChangeHandler = (e) => {
        if (e.target.files.length > 0){
            console.log(e.target.files[0])
            setLogoImage(e.target.files[0]);
        }
    }

    const createCollection = async () => {
        console.log(NFTMinter);
        // const selectedCateg = document.getElementById('custom-select').value;
        if (authedUser.authedUser.address){
            console.log(name, desc, logoImage);
            if (name !== '' && desc !== '' && logoImage !== '' && royalty !== '' && symbol !== ''){
                // setCreateModal(true);
                console.log(`${logoImage.name}`, name, desc, royalty, symbol, logoImage);
                try{
                    // const signature = await web3.eth.personal.sign(
                    //     `I am signing my one-time nonce: ${authedUser.authedUser.nonce}`,
                    //     authedUser.authedUser.address,
                    //     '' // MetaMask will ignore the password argument here
                    // );
                    setCreateModal(true);
                    setStatus('Creating Collection');
                    const r = await CollectionMinter.methods.createNewCollection(name, symbol, 1990, parseInt(royalty)*100).send({
                        from: authedUser.authedUser.address
                    });
                    console.log(r.events.NewCollection.returnValues.collectionAddress);
                    let caddr;
                    console.log(r.events.NewCollection.returnValues.collectionAddress.endsWith("\n"));
                    if (r.events.NewCollection.returnValues.collectionAddress.endsWith("\n")){
                        caddr = r.events.NewCollection.returnValues.collectionAddress.slice(0,-2);
                    }
                    else{
                        caddr = r.events.NewCollection.returnValues.collectionAddress;
                    }
                    console.log(caddr);
                    setStatus('Setting Up Collection');
                    let x = await dispatch(addCollectionRequest(logoImage, authedUser.authedUser.address, caddr, name, symbol, royalty));
                    if (featuredImage !== ''){
                        var myHeadersFeature = new Headers();

                        var formdataFeature = new FormData();
                        formdataFeature.append("featuredImg", featuredImage, featuredImage.name);
                        formdataFeature.append("collection_address", caddr);

                        var requestOptionsFeature = {
                            method: 'POST',
                            headers: myHeadersFeature,
                            body: formdataFeature,
                            redirect: 'follow'
                        };
                        fetch(`${process.env.REACT_APP_BASE_URL}/collections/featured-img`, requestOptionsFeature)
                        .then(response => response.json())
                        .then(result => {
                          console.log(result)
                          if (result.success){
                            dispatch(replaceCollection(result.collection));
                          }
                        })
                    }
                    if (bannerImage !== ''){
                        var myHeadersBanner = new Headers();

                        var formdataBanner = new FormData();
                        formdataBanner.append("bannerImg", featuredImage, featuredImage.name);
                        formdataBanner.append("collection_address", caddr);

                        var requestOptionsBanner = {
                            method: 'POST',
                            headers: myHeadersBanner,
                            body: formdataBanner,
                            redirect: 'follow'
                        };
                        fetch(`${process.env.REACT_APP_BASE_URL}/collections/banner-img`, requestOptionsBanner)
                        .then(response => response.json())
                        .then(result => {
                          console.log(result)
                          if (result.success){
                            dispatch(replaceCollection(result.collection));
                          }
                        })
                    }
                    setCreateModal(false);
                }
                catch(e){
                    console.log('hereeee');
                    console.log(e);
                    setCreateModal(false);
                    setStatus('Not Created');
                    alert('Failed!');
                }    
            }
            else{
                alert('Fill the complete form first!');
            }
        }
        else{
            alert('Connect Wallet');
        }
    }
    

  return(
        <>
            <div className="container create-nft-form mt-4" style={{color: 'white'}}>
                <div className="row">
                    <div className="col-12" >
                        <h3 style={{fontFamily: 'Gotham-Font-Navbar', fontWeight: '600', fontSize: '32px'}}>Create a Collection</h3>
                        <h6 style={{fontWeight: '400'}}>Create your Collection</h6>
                    </div>
                </div>
            </div>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12 p-0">
                        <hr style={{
                            backgroundImage: 'linear-gradient(90deg, #17e9d9 0%, #4fa3e1 50%, #875fe9 100%)',
                            height: '2px'
                            }} />
                    </div>
                </div>
            </div>
            <div className="container">
              <img src={Empirelogo} alt="..." id="connect-bg-logo" style={{top: '40%'}}></img>
            
            <div className="row mt-4 mb-3">
                <div className="col-12 text-white">
                    <div style={{fontSize: '18px', marginBottom: '10px'}} >Logo</div>
                    <p style={{fontSize: '14px', marginBottom: '10px', color: 'grey'}}>This image will also be used for navigation. Aspect ratio 1:1 recommended.</p>
                </div>
                <div className="col-5 col-sm-4 col-md-3 text-white">
                    <div id="logo-upload" onClick={() => document.getElementById("input-logo-file").click()}>
                        <img src={ImgPlaceholder} />
                        {/* Upload Any File with these ext: png, jpg, jpeg, webp, gif <br/>
                        <div className="upload-btn">Upload</div> */}
                    </div>
                    <input type="file" style={{display: 'none'}} id="input-logo-file" onChange={logoFileChangeHandler} />
                </div>
                <div className="col-12 col-sm-8"></div>
                <div className="col-12 col-sm-3 mt-3">
                    <div className="card onsale-item" >
                        {logoImage ? (
                            <img variant="top" className="card-img item-img" src={URL.createObjectURL(logoImage)} />
                        ) : (
                            <></>
                        )}
                    </div>
                </div>
            </div>
            <div className="row mt-4 mb-3">
                <div className="col-12 text-white" >
                    <div style={{fontSize: '18px', marginBottom: '10px'}} >Featured Image</div>
                    <p style={{fontSize: '14px', marginBottom: '10px', color: 'grey'}}>(optional) This image will be used for featuring your collection on the homepage, category pages, or other areas.
                        Image size 600 x 400 recommended.</p>
                </div>
                <div className="col-12 col-sm-5 text-white">
                    <div id="featured-img-upload" onClick={() => document.getElementById("input-featured-file").click()}>
                        <img src={ImgPlaceholder} />
                        {/* Upload Any File with these ext: png, jpg, jpeg, webp, gif <br/>
                        <div className="upload-btn">Upload</div> */}
                    </div>
                    <input type="file" style={{display: 'none'}} id="input-featured-file" onChange={featuredFileChangeHandler} />
                </div>
                <div className="col-12 col-sm-8"></div>
                <div className="col-12 col-sm-3 mt-3">
                    <div className="card onsale-item" >
                        {featuredImage ? (
                            <img variant="top" className="card-img item-img" src={URL.createObjectURL(featuredImage)} />
                        ) : (
                            <></>
                        )}
                    </div>
                </div>
            </div>
            <div className="row mt-4 mb-3">
                <div className="col-12 text-white" >
                    <div style={{fontSize: '18px', marginBottom: '10px'}} >Banner Image</div>
                    <p style={{fontSize: '14px', marginBottom: '10px', color: 'grey'}}>(optional) This image will appear at the top of your collection page. Avoid including too much text in this banner image,
                    as the dimensions change on different devices. Image size 1400 x 400 recommended.</p>
                </div>
                <div className="col-12 col-sm-8 text-white">
                    <div id="banner-img-upload" onClick={() => document.getElementById("input-banner-file").click()}>
                        <img src={ImgPlaceholder} />
                        {/* Upload Any File with these ext: png, jpg, jpeg, webp, gif <br/>
                        <div className="upload-btn">Upload</div> */}
                    </div>
                    <input type="file" style={{display: 'none'}} id="input-banner-file" onChange={bannerFileChangeHandler} />
                </div>
                <div className="col-12 col-sm-4"></div>
                <div className="col-12 col-sm-3 mt-3">
                    <div className="card onsale-item" >
                        {bannerImage ? (
                            <img variant="top" className="card-img item-img" src={URL.createObjectURL(bannerImage)} />
                        ) : (
                            <></>
                        )}
                    </div>
                </div>
            </div>
            
            <div className="row"> 
                <div className="col-6 col-sm-6" style={{color: 'white'}}>
                    <label htmlFor="title">Name</label> <br/>
                    <input type="text" placeholder="Name of your Collection" id="title" onChange={(e) => setName(e.target.value)} />
                </div>
                
                <div className="col-6 col-sm-6" style={{color: 'white'}}>
                    <label htmlFor="symbol">Symbol</label> <br/>
                    <input type="text" placeholder="Symbol" id="symbol" onChange={(e) => setSymbol(e.target.value)} />
                </div>
                {/* <div className="col-6 col-sm-4" style={{color: 'white'}}>
                    <label htmlFor="category">Category</label> <br/>
                    <select id="custom-select" style={{width: 'inherit'}}>
                        <option value="unique">Unique</option>
                        <option value="gaming">Gaming</option>
                        <option value="art">Art</option>
                        <option value="signed">Signed</option>
                        <option value="tradingcards">Trading Cards</option>
                        <option value="meme">MEME</option>
                        <option value="digital">Digital</option>
                    </select>
                </div> */}
            </div>
            <div className="row mt-4 mb-3">
                <div className="col-12 col-sm-8" style={{color: 'white'}}>
                    <label htmlFor="descript">Description</label><br/>
                    <textarea type="text" rows="10" placeholder="0 of 1000 characters used." id="descript" onChange={(e) => setDesc(e.target.value)}></textarea>
                </div>
            </div>
            <div className="row mt-4 mb-3">
                <div className="col-12 text-white">
                    <label style={{fontSize: '18px', marginBottom: '10px'}} htmlFor="royaltyfee">Royalties</label> <br/>
                    <p style={{fontSize: '14px', marginBottom: '10px', color: 'grey'}}>Collect a fee when a user re-sells an item you originally created. This is deducted from the final sale price and paid monthly
                        to a payout address of your choosing.</p>

                </div>
                <div className="col-6 col-sm-4" style={{color: 'white'}}>
                    <input type="text" placeholder="Royalty Percent" id="royaltyfee" onChange={(e) => setRoyalty(e.target.value)} />
                </div>
            </div>
            
            <div className="row mt-4 mb-3">
                <div className="col-12 col-sm-8" style={{color: 'white'}}>
                    <h5>Payment Tokens</h5>
                    <p>These tokens can be used to buy or sell your items</p>
                    <div className="payment-token">
                        <span style={{backgroundImage: 'radial-gradient(circle at center, #1f4169 0%, #0f2135 100%)', padding: '15px', borderRadius: '13px'}}>
                            <img src="https://cryptologos.cc/logos/binance-coin-bnb-logo.svg?v=013" className="payment-token-bnb" />
                        </span>
                        <div style={{padding: '10px'}}>
                            <span style={{fontSize: '21px', color: '#18e9d9', fontWeight: '500'}}>BNB</span><br style={{lineHeight: '0px' }}/>
                            <span>Binance Coin</span>
                        </div>

                    </div>
                </div>
            </div>
            <div className="row mt-4 mb-3">
                <div className="col-12 col-sm-6">
                    <button onClick={() => createCollection()} className="create-btn">Create</button>
                </div>
            </div>
            <Modal isOpen={createModal} className="create-modal">
                <ModalBody style={{textAlign: 'center'}}>
                    <div className="create-loader"></div>
                    <h4>Status: {status}</h4>
                    <p>Dont close the window until the project is created!</p>                        
                </ModalBody>
            </Modal>
            {/* <CreateModal createModal={createModal} setCreateModal={setCreateModal} status={status} mintToken={mintToken} /> */}
        </div>
        </>
  );
}