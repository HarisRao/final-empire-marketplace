import Web3 from 'web3';

let web3;
// import { MoralisProvider } from "react-moralis";

const provider = new Web3.providers.HttpProvider(
  'https://ropsten.infura.io/v3/3f2f5e20071a4cbe9dd30a0090ff6402'
);
if (window.web3){
    web3 = new Web3(window.ethereum);
}
else{
    web3 = new Web3('https://data-seed-prebsc-1-s1.binance.org:8545');
}

export default web3;