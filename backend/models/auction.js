const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var Auction = new Schema({
    item_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Item'
    },
    status: { //false means not live, true means live
        type: Boolean,
    },
    highestBid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Bid'
    },
    price: {
        type: String
    },
    txId: {
      type: String
    },
    enddate: {
        type: String
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Auction', Auction);