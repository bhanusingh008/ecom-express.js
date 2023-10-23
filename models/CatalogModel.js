const mongoose = require("mongoose");

const catalogSchema = new mongoose.Schema({
    seller_id:{
        type: String,
        required:true,
        unique: true
    },
    
    // how to send a list of json objects
    products:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product'
        }
    ]
});

const Catalog = mongoose.model('Catalog', catalogSchema);

module.exports = Catalog;