import web3 from './web3';
import NFTMarketPlace from './ethereum/NFTMarketPlace.json';

const instance = new web3.eth.Contract(
    NFTMarketPlace.abi, 
    process.env.REACT_APP_MARKETPLACE_ADDRESS
);

export default instance;