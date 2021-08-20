import React, { useState } from 'react';
import './connectpage.css';
import ConnectWallet from '../../images/ConnectWalletpng.png';
import metamask from '../../images/metamask.png';
import Empirelogo from '../../images/empirelogo.png'
import { getMyItems, logInRequest } from '../../redux/ActionCreators';
import { useDispatch } from 'react-redux';

export default function ConnectPage(){
  const [selectedWallet, setSelectedWallet] = useState('metamask');
  const dispatch = useDispatch();

  const connectMetamask = async () => {
    console.log('here');
    if (!window.ethereum){
        alert('Install metamask first!');
    }
    else if (window.ethereum.chainId !== process.env.REACT_APP_CHAIN_ID){
        alert('Connect to BSC Testnet')
    }
    else{
        var accs = await window.ethereum.request({ method: 'eth_requestAccounts' });
        if (accs.length > 0){
          dispatch(logInRequest(accs[0]))
          .then(res => {
            if (res.type === "LOGGED_IN"){
              //retrieve user's items
              dispatch(getMyItems(accs[0]));
            }
          });
        }
        else{
          alert('Please connect to MetaMask.');
        }
    }
}


  return(
    <div className="container-fluid connect-wallet-page">
      <img src={Empirelogo} alt="..." id="connect-bg-logo" style={{top: '40%'}}></img>
      <div className="row">
        <div className="col-12">
          <h2>Connect Wallet</h2>
        </div>
        <div className="col-12 p-0">
          <hr style={{
              backgroundImage: 'linear-gradient(90deg, #17e9d9 0%, #4fa3e1 50%, #875fe9 100%)',
              height: '2px'
            }} />
        </div>
        <div className="col-12 offset-sm-2 col-sm-8 offset-md-3 col-md-6 connect-wallet-text text-center">
            {selectedWallet === 'walletconnect' ? (
              <img src={ConnectWallet} style={{height: '90px'}} />
            ) : (
              <img src={metamask} style={{height: '90px',marginBottom:'9px'}} />
            )}
            <h4>
              Connect with {selectedWallet === 'metamask' ? (
              'Metamask'
            ) : (
              'Connect Wallet'
            )}
            </h4>
            <p>
              Your WalletConnect wallet will be connected and used to securely store your digital assets.
            </p>
        </div>

        <div className="col-12 offset-sm-3 col-sm-6 offset-md-4 col-md-4 connect-wallet-text" style={{fontSize: '18px'}}>
            <div className="wallet-btn" onClick={() => {setSelectedWallet('metamask'); connectMetamask();}} style={{border: selectedWallet === "metamask" ? '2px solid #1f4169' : '2px solid transparent'}}>
              <img src={metamask} style={{height: '25px', marginLeft: '15px'}} />
              <span className="text-center" style={{marginLeft: 'auto', marginRight: 'auto'}}>
                Metamask
              </span>
            </div>
            <div className="wallet-btn" onClick={() => {setSelectedWallet('metamask'); connectMetamask();}} style={{border: selectedWallet === "walletconnect" ? '2px solid #1f4169' : '2px solid transparent'}}>
              <img src={ConnectWallet} style={{height: '25px', marginLeft: '15px'}} />
              <span className="text-center" style={{marginLeft: 'auto', marginRight: 'auto'}}>
                WalletConnect
              </span>
            </div>
        </div>
      </div>
    </div>
  );
}