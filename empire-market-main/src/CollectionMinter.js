import web3 from './web3';
import CollectionMinter from './ethereum/collectionMinterV2.json';

const instance = new web3.eth.Contract(
    CollectionMinter, 
    process.env.REACT_APP_COLLECTION_MINTER
);

export default instance;