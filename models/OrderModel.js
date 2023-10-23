const mongoose = require('mongoose');

const order_model = mongoose.Schema({
    seller_id:{
        type:String,
        required:true
    },

    products:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product'
        }
    ],

    buyer_id:{
        type:String,
        required: true
    }
});

module.exports = mongoose.model('Order', order_model);
