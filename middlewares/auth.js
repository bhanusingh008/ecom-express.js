const { getUser } = require("../services/auth");

async function loggedInAreaSeller(req, res, next){

    const userId = req.cookies.uid;

    if(!userId){
        return res.status(401).send('no cookies from you.');
    }

    const user = getUser(userId);

    if(!user){
        return res.status(401).send('No user is logged in.');
    }

    if(user.type !=='seller'){
        return res.status(401).send('Accessible to Sellers only.');
    }

    req.user = user;

    next();
}

async function loggedInAreaBuyer(req, res, next){

    const userId = req.cookies.uid;

    if(!userId){
        return res.status(401).send('no cookies from you.');
    }

    const user = getUser(userId);

    if(!user){
        return res.status(401).send('No User is logged in.');
    }

    if(user.type !=='buyer'){
        return res.status(401).send('Accessible to Buyers only.');
    }

    req.user = user;

    next();
}

module.exports={
    loggedInAreaSeller,
    loggedInAreaBuyer
}