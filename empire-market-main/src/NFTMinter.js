import web3 from './web3';
import NFTMinter from './ethereum/NFTMinter.json';

const instance = new web3.eth.Contract(
    NFTMinter, 
    process.env.REACT_APP_EMPIRE_TOKEN
);

export default instance;