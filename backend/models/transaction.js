const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var Transaction = new Schema({
	  item_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Item'
    },
    buyer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    seller: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    price: {
        type: String,
    },
    mode: { //false means instant buy, true means through auction
        type: Boolean,
    },
    auction_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Auction'
    },
    txId: {
        type: String
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Transaction', Transaction);