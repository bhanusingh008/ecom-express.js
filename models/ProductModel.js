const mongoose = require('mongoose');

const product_model = mongoose.Schema({
    name :{
        type:String,
        required:true
    },

    price:{
        type: String
    },

    seller_id:{type : String, required: true}
});

module.exports = mongoose.model('Product', product_model);
