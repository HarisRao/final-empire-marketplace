import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import web3 from '../../web3';
import { createItemRequest, itemMinted, updateItem } from '../../redux/ActionCreators';
import NFTMinter from '../../NFTMinter';
import CollectionMinter from '../../CollectionMinter';
import CreateModal from './createModal';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Label, InputGroup, InputGroupAddon, InputGroupText, Input } from 'reactstrap';
import Marketplace from '../../Marketplace';
import { useHistory } from 'react-router-dom';
import ImgPlaceholder from '../../images/img-placeholder.png'
import Empirelogo from '../../images/empirelogo.png'
import ERC721ABI from '../../ethereum/ERC721V2.json';

const crypto = require('crypto');

const addToIPFS = (image) => {
    var myHeaders = new Headers();

    var formdata = new FormData();
    formdata.append("", image, image.name);

    var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: formdata,
    redirect: 'follow'
    };

    return fetch("https://ipfs.infura.io:5001/api/v0/add", requestOptions)
    .then(response => response.text())
    .then(result => {console.log(result); return result})
    .catch(error => {console.log('error', error); return error});
}

const addObjectToIPFS = (obj) => {
    var myHeaders = new Headers();
    const code = crypto.randomBytes(4).toString('hex')
    var formdata = new FormData();
    const str = JSON.stringify(obj);
    const bytes = new TextEncoder().encode(str);
    const blob = new Blob([bytes], {
        type: "application/json;charset=utf-8"
    });
    formdata.append("", blob, `metadata_${code}.json`);

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: formdata,
        redirect: 'follow',
    };

    return fetch("https://ipfs.infura.io:5001/api/v0/add", requestOptions)
    .then(response => response.text())
    .then(result => {console.log(result); return result})
    .catch(error => {console.log('error', error); return error});
}


export default function CreateMiddle(){
    const authedUser = useSelector(state => state.authedUser);
    const collections = useSelector(state => state.collections);
    // const [selectedCateg, setSelectedCateg] = useState('');
    const [name, setName] = useState('');
    const [mintLoading, setMintingLoading] = useState(false);
    const [desc, setDesc] = useState('');
    const [image, setImage] = useState('');
    const [status, setStatus] = useState('Not Created');
    const [itemCreated, setItemCreated] = useState({});
    const [createModal, setCreateModal] = useState(false);
    const [listingg, setListingg] = useState(false);
    const [listingStatus, setListingStatus] = useState('0'); // 0 - no status, // 1 - for instant buy, // 2- auction
    const [step, setStep] = useState(1); 
    const [bnbAmt, setBnbAmt] = useState(0); 
    const [updateLoading, setUpdateLoading] = useState(false);
    const [enddate, setEndDate] = useState("");
    const [categoryName, setCategoryName] = useState('');
    const [otherSelected, setOtherSelected] = useState(false);


    const resett = () => {
        setCreateModal(false);
        setListingStatus('0');
        setEndDate('');
        setStep(1);
    }

    const toggle = () => setCreateModal(!createModal);
    const history = useHistory();

    const dispatch = useDispatch();
    
    const isApproved = async (token_id, collection_address) => {
        let tid = parseInt(token_id);
        console.log(tid, collection_address);
        let minterNFT = new web3.eth.Contract(ERC721ABI, collection_address);
        console.log(minterNFT);
        const approvedAddress = await minterNFT.methods.getApproved(tid).call({from: authedUser.authedUser.address});
        console.log(approvedAddress);
        if (approvedAddress !== process.env.REACT_APP_MARKETPLACE_ADDRESS){
            await minterNFT.methods.approve(process.env.REACT_APP_MARKETPLACE_ADDRESS, tid).send({from: authedUser.authedUser.address});
        }
    }
    
    const listNft = async () => {
    const isAuction = listingStatus === '2';
    const collection = collections.collections.filter(c => c._id === itemCreated.collection_id)[0];
    console.log(collection);
    if (listingStatus === '1'){ //instant buy
        console.log(bnbAmt);
        if (parseFloat(bnbAmt) > 0){
        setStatus('Getting Approval to list NFT');
        setUpdateLoading(true);
        try{
            await isApproved(itemCreated.nft_id, collection.address);
            setStatus('Listing NFT');
            const result = await Marketplace.methods.addItemToMarket(itemCreated.nft_id, collection.address, web3.utils.toWei(bnbAmt), isAuction).send({from: authedUser.authedUser.address});
            setStatus('Completing..');
            console.log(result);
            //dispatch to add marketplace id
            let nft_id = itemCreated.marketplace_id;
            if (result.events.ItemAdded){
            nft_id = result.events.ItemAdded.returnValues[0];
            }
            console.log("new item, case 1");
            dispatch(updateItem(web3.utils.toWei(bnbAmt), listingStatus, itemCreated._id, authedUser.authedUser.address, nft_id, result.transactionHash, ''))
            .then(res => {
                setUpdateLoading(false);
                toggle();
                resett();
                history.push('/profile');
                console.log(res);
            });  
        }
        catch(e){
            console.log(e);
            setUpdateLoading(false);
            toggle();
            resett();            }
        }
        else{
            alert('Set Price greater than 0!');
        }
    }
    else if (listingStatus === '2'){
        console.log(bnbAmt, enddate);
        if (parseFloat(bnbAmt) > 0){
        setStatus('Getting Approval to list NFT');
        setUpdateLoading(true);
        try{
            await isApproved(itemCreated.nft_id, collection.address);
            setStatus('Listing NFT');
            const result = await Marketplace.methods.addItemToMarket(itemCreated.nft_id, collection.address, web3.utils.toWei(bnbAmt), isAuction).send({from: authedUser.authedUser.address});
            setStatus('Completing..');
            console.log(result);
            //dispatch to add marketplace id
            let nft_id = itemCreated.marketplace_id;
            if (result.events.ItemAdded){
            nft_id = result.events.ItemAdded.returnValues[0];
            }
            console.log("new item, case 1");
            dispatch(updateItem(web3.utils.toWei(bnbAmt), listingStatus, itemCreated._id, authedUser.authedUser.address, nft_id, result.transactionHash, enddate))
            .then(res => {
                setUpdateLoading(false);
                toggle();
                resett();
                history.push('/profile');
                console.log(res);
            });  
        }
        catch(e){
            console.log(e);
            setUpdateLoading(false);
            toggle();
            resett();
        }
        }
        else{
            alert('Set Price greater than 0!');
        }
    }
    }

    const fileChangeHandler = (e) => {
        if (e.target.files.length > 0){
            console.log(e.target.files[0])
            setImage(e.target.files[0]);
        }
    }
    const createItem = async () => {
        console.log(NFTMinter);
        let selectedCateg = document.getElementById('custom-select').value;
        let selectedCollection = collections.collections.filter(c => c._id === document.getElementById('select-collection').value)[0];
        console.log(selectedCollection)
        if (selectedCateg === "other"){
            selectedCateg = categoryName;
        }
        if (authedUser.authedUser.address){
            console.log(name, desc, selectedCateg, image);
            if (name !== '' && desc !== '' && selectedCateg !== '' && image !== '' && selectedCollection !== ''){
                setStatus('Getting Signature..');
                // setShowModal(true);
                setCreateModal(true);
                console.log(`${image.name}`, name, desc, image, selectedCateg);
                try{
                    const signature = await web3.eth.personal.sign(
                        `I am signing my one-time nonce: ${authedUser.authedUser.nonce}`,
                        authedUser.authedUser.address,
                        '' // MetaMask will ignore the password argument here
                    );
                    setStatus('Uploading To IPFS');
                    const ipfs_res = await addToIPFS(image);
                    console.log(ipfs_res);
                    const metadata = {
                        name: name,
                        description: desc,
                        category: selectedCateg,
                        collection_address: selectedCollection.address,
                        creator: authedUser.authedUser.address,
                        ifps_image: JSON.parse(ipfs_res)["Hash"],
                        attributes: []
                    }
                    const json_ipfs = await addObjectToIPFS(metadata);
                    setStatus('Creating..');
                    //send to db
                    const res = await dispatch(createItemRequest(name, desc, image, JSON.parse(json_ipfs)["Hash"], JSON.parse(ipfs_res)["Hash"], authedUser.authedUser.address, signature, selectedCateg, image.type, selectedCollection._id));
                    console.log(res);
                    setItemCreated(res.payload);
                    setStatus('Asking to Mint');
                    console.log('donee');
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
    const mintToken = async () => {
        console.log(itemCreated);
        let collection = collections.collections.filter(c => c._id === itemCreated.collection_id)[0];
            try{
                console.log('here');
                setStatus('Minting NFT');
                setMintingLoading(true)
                // const signature = await web3.eth.personal.sign(
                //     `I am signing my one-time nonce: ${authedUser.authedUser.nonce}`,
                //     authedUser.authedUser.address,
                //     '' // MetaMask will ignore the password argument here
                // );
                let minted;
                console.log(collection.address === process.env.REACT_APP_EMPIRE_TOKEN, collection.address, process.env.REACT_APP_EMPIRE_TOKEN);
                if (collection.address === process.env.REACT_APP_EMPIRE_TOKEN){
                    console.log("Empire Minting", NFTMinter)
                    minted = await NFTMinter.methods.createItem(itemCreated.token_uri).send({
                        from: authedUser.authedUser.address
                    });
                }
                else{
                    console.log("Other Collection Minting", collection.address, itemCreated.token_uri);
                    let minterNFT = new web3.eth.Contract(ERC721ABI, collection.address);
                    console.log(minterNFT);
                    minted = await minterNFT.methods.safeMint(itemCreated.token_uri).send({
                        from: authedUser.authedUser.address
                    });
                }
                console.log(minted);
                console.log(minted.events.Transfer.returnValues[2]);
                dispatch(itemMinted(itemCreated._id, authedUser.authedUser.address, minted.events.Transfer.returnValues[2]))
                .then(res => {
                    setMintingLoading(false);
                    setStatus('Not Listed');
                    setListingg(true);
                    setItemCreated(res.payload);
                    // setShowModal(false);
                    // history.push(`/token/${process.env.REACT_APP_TOKEN_ADDRESS}/${minted.events.Transfer.returnValues[2]}`)
                });    
            }
            catch(e){
                console.log("fuckkkkk", e);
                setMintingLoading(false);
                setStatus('');
                setCreateModal(false);
                // setShowModal(false);
            }
        }
    

    const openOtherCatInput = (i) => {
        if (i === 7){
            setOtherSelected(true);
        }
        else if (otherSelected){
            setOtherSelected(false);
        }
    }

  return(
        <>
            <div className="container create-nft-form mt-4" style={{color: 'white'}}>
            <div className="row">
                <div className="col-12" >
                    <h3 style={{fontFamily: 'Gotham-Font-Navbar', fontWeight: '600', fontSize: '32px'}}>Create an Item</h3>
                    <h6 style={{fontWeight: '400'}}>Create your NFT</h6>
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
                <div className="col-12 col-sm-4 text-white">
                    <div style={{fontSize: '18px', marginBottom: '10px'}} >Featured Image</div>
                    <div id="img-upload" onClick={() => document.getElementById("input-file").click()}>
                        <img src={ImgPlaceholder} />
                        {/* Upload Any File with these ext: png, jpg, jpeg, webp, gif <br/>
                        <div className="upload-btn">Upload</div> */}
                    </div>
                    <input type="file" style={{display: 'none'}} id="input-file" onChange={fileChangeHandler} />
                </div>
                <div className="col-12 col-sm-8"></div>
                <div className="col-12 col-sm-3 mt-3">
                    <div className="card onsale-item" >
                        {image ? (
                            <img variant="top" className="card-img item-img" src={URL.createObjectURL(image)} />
                        ) : (
                            <></>
                        )}
                    </div>
                </div>
            </div>
            <div className="row"> 
                <div className="col-6 col-sm-6" style={{color: 'white'}}>
                    <label htmlFor="title">Name</label> <br/>
                    <input type="text" placeholder="Name of your NFT" id="title" onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="col-6 col-sm-6" style={{color: 'white'}}>

                    <label htmlFor="custom-select">Category</label> <br/>
                    <select onChange={(e) => openOtherCatInput(e.target.options.selectedIndex)} id="custom-select" style={{width: 'inherit'}}>
                        <option value="unique" selected>Unique</option>
                        <option value="gaming">Gaming</option>
                        <option value="art">Art</option>
                        <option value="signed">Signed</option>
                        <option value="tradingcards">Trading Cards</option>
                        <option value="meme">MEME</option>
                        <option value="digital">Digital</option>
                        <option value="other">Other</option>
                    </select>
                </div>
            </div>
            {otherSelected && (
                <div className="row mt-3 mb-3">
                    <div className="col-6 col-sm-4" style={{color: 'white'}}>
                        <label htmlFor="title">Enter Category Name</label> <br/>
                        <input type="text" placeholder="Category Name" id="title" onChange={(e) => setCategoryName(e.target.value)} />
                    </div>
                </div>
            )}
            
            <div className="row mt-4"> 
                <div className="col-6 col-sm-8" style={{color: 'white'}}>

                    <label htmlFor="select-collection">Select Collection to mint from</label> <br/>
                    <select id="select-collection" style={{width: 'inherit'}}>
                        {collections.collections.filter(c => (c.owner === 'admin' | c.owner === authedUser.authedUser._id)).map(a => {
                            return(<option value={a._id}>{a.name}</option>);
                        })}
                    </select>
                </div>
            </div>
            <div className="row mt-4 mb-3">
                <div className="col-12 col-sm-8" style={{color: 'white'}}>
                    <label htmlFor="descript">Descriptionnn</label><br/>
                    <textarea type="text" rows="10" placeholder="0 of 1000 characters used." id="descript" onChange={(e) => setDesc(e.target.value)}></textarea>
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
                    <button onClick={() => createItem()} className="create-btn">Create</button>
                </div>
            </div>
            
            <Modal isOpen={createModal} className="create-modal">
                        {listingg ? (
                            <>
                            <ModalHeader toggle={toggle}>List Your Token - Step {step}</ModalHeader>
                            <ModalBody>
                            {listingStatus === '0' && (
                            <>
                                <div className="list-status-btn" onClick={() => {setListingStatus('2'); setStep(2)}}>
                                List for - Auction
                                </div>
                                <div className="list-status-btn" onClick={() => {setListingStatus('1');  setStep(2)}}>
                                List for - Instant Buy
                                </div>
                            </>        
                            )}
                            {listingStatus === '1' && (
                            <>
                            <Label style={{textAlign: 'left'}}>Enter Amount:</Label>
                            <InputGroup>
                                <Input placeholder="BNB Amount" value={bnbAmt} onChange={(e) => setBnbAmt(e.target.value)} />
                                <InputGroupAddon addonType="append">
                                <InputGroupText>
                                    <img src="https://cryptologos.cc/logos/binance-coin-bnb-logo.svg?v=013" style={{height: '20px'}} />
                                </InputGroupText>
                                </InputGroupAddon>
                            </InputGroup>
                            </>        
                            )}
                            {listingStatus === '2' && (
                                <><Label style={{textAlign: 'left'}}>Enter Amount:</Label>
                                <InputGroup>
                                <Input placeholder="BNB Amount" value={bnbAmt} onChange={(e) => setBnbAmt(e.target.value)} />
                                <InputGroupAddon addonType="append">
                                    <InputGroupText>
                                    <img src="https://cryptologos.cc/logos/binance-coin-bnb-logo.svg?v=013" style={{height: '20px'}} />
                                    </InputGroupText>
                                </InputGroupAddon>
                                </InputGroup>

                                <Label>End date</Label>
                                <input className="form-control" type="datetime-local" value={enddate} onChange={(e) => setEndDate(e.target.value)} label="End date"
                                placeholder="End Auction Date"/>
                                </>
                            )}
                            {updateLoading && (
                                <div style={{textAlign: 'center'}}>
                                <div className="create-loader text-center"></div>
                                    <h4>Status: {status}</h4>
                                    <p>Dont close the window until the item is listed is created!</p>
                                </div>
                            )}

                            </ModalBody>
                                <ModalFooter>
                                {listingStatus !== '0' && (
                                    <Button color="secondary" onClick={() => listNft()}>List NFT</Button>
                                )}
                                <Button color="secondary" onClick={() => {resett(); history.push('/profile')}}>Cancel</Button>
                                </ModalFooter>
                            </>
                        ) : (
                            <>
                            <ModalHeader style={{display: (status === 'Asking to Mint') ? 'flex' : 'none'}} toggle={() => setCreateModal(!createModal)}>Mint NFT</ModalHeader>
                            <ModalBody style={{textAlign: 'center'}}>
                                {status === 'Asking to Mint' ? (
                                    'Do you want to mint your NFT'
                                ) : (
                                    <>
                                        <div className="create-loader"></div>
                                        <h4>Status: {status}</h4>
                                        <p>Dont close the window until the project is created!</p>                        
                                    </>
                                )}
                                {status === 'Listing'}
                            </ModalBody>
                            <ModalFooter style={{display: (status === 'Asking to Mint') ? 'flex' : 'none'}}>
                                <Button type="button" className="btn btn-primary" onClick={() => mintToken()}>Mint Now</Button>
                                <Button onClick={() => {setCreateModal(false); history.push('/create')}} type="button" className="btn btn-secondary">Close</Button>
                            </ModalFooter>
                            </>    
                        )}
            </Modal>

            {/* <CreateModal createModal={createModal} setCreateModal={setCreateModal} status={status} mintToken={mintToken} /> */}
        </div>
        </>
  );
}