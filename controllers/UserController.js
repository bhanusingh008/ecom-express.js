const User = require('../models/UserModel');

const Product = require('../models/ProductModel')

const Order = require('../models/OrderModel');

const Catalog = require('../models/CatalogModel');

const {v4: uuidv4} = require('uuid');

const {getUser} = require('../services/auth')

const ProductModel = require('../models/ProductModel');

// get seller list
const get_sellers_list = async (req, res)=>{
    const sellers = await User.find({type:"seller"});

    const list = [];

    for(let curr in sellers){
        list.push(sellers[curr].username);
    }

    return res.status(200).send(list);
};

// create catalog
const create_catalog = async (req, res) =>{
    // requests a list of products.

    try{

        const list_products = req.body.products;

        const check_user = getUser(req.cookies.uid);

        if(!check_user){
            return res.status(401).send('User not found.');
        }

        const seller_id_catalog = check_user.id;

        const check_catalog = await Catalog.findOne({seller_id: seller_id_catalog});

        if(check_catalog){
            return res.status(400).send('Catalog Already Exists');
        }

        const product_list = [];

        for(let curr in list_products){
           const curr_product = new ProductModel({
                name : list_products[curr].name,
                price : list_products[curr].price,
                seller_id: seller_id_catalog
           });

           product_list.push(curr_product);
           curr_product.save();
        };

        if(!list_products){
            return res.status(200).send('No products were added');
        }

        const catalog = new Catalog({
            seller_id: seller_id_catalog,
            products: product_list
        });

        const savedData = await catalog.save();

        res.status(200).send({created: true, data: savedData});

    }catch(err){
        res.status(400).send(err);
    }
};

// get catalog
const get_catalog = async (req, res) =>{
    const seller_id = req.params['seller_id'];

    const catalog = await Catalog.find({seller_id: seller_id});

    const list = [];

    const prods = catalog[0].products;

    for(let curr in prods){

        const prod = await Product.find(prods[curr]._id);
        
        let name = prod[0].name;
        let price = prod[0].price;

        list.push({name: name, price: price})
    }

    res.status(200).send(list);
};

// create order
const create_order = async (req, res)=>{

    const user = getUser(req.cookies.uid);

    try{
        const seller_id = req.params['seller_id'];

        // take it from cookie
        const buyer_id = user.id;

        console.log(buyer_id);
    
        const prods = req.body.products;
    
        const list = [];
    
        for(let curr in prods){
    
            const prod = await Product.find({_id: prods[curr]});
    
            if(prod.length === 0) continue;
    
            list.push(prod[0]);
        }
    
        const order = new Order({
    
            seller_id: seller_id,
            products:list,
            buyer_id: buyer_id
        });
    
        const savedOrder = await order.save();
    
        res.status(200).send({order: "placed", data: savedOrder});

    }catch(err){

        res.status(400).send(err);
    }
}

// list of orders
const list_orders = async (req, res)=>{

    const user = req.user;

    const user_id = user.id;

    const orders = await Order.find({seller_id: user_id});

    const list = [];

    for(let curr in orders){
        const {buyer_id, products} = orders[curr];

        list.push({buyer_id, products});
    }

    res.status(200).send(list);
}

module.exports = {
    get_sellers_list,
    create_catalog,
    get_catalog,
    create_order,
    list_orders
}