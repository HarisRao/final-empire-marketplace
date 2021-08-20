const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var Item = new Schema({
	name: {
		type: String,
        default: '',
    },
    description: {
        type: String,
        unique: true
    },
    image_ipfs: {
        type: String
    },
    token_uri: {
        type: String
    },
    image_local: {
        type: String
    },
    price: {
        type: String
    },
    status: {
        type: String
    },
    minted: {
        type: Boolean,
        default: false
    },
    nft_id: {
        type: String,
    },
    marketplace_id: {
        type: String
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    category: {
        type: String
    },
    likedBy: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        }],
        default: []
    },
    nft_type: {
        type: String
    },
    collection_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Collection',
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Item', Item);