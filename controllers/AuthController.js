const User = require('../models/UserModel');

const {v4: uuidv4} = require('uuid');

const {setUser} = require('../services/auth');

const bcrypt = require('bcrypt');


const registerUser = async (req, res) =>{

        const {username, password, type} = req.body;

        let user_check = await User.findOne({username});

        if(user_check){
            return res.status(400).send("User Already Registered");
        }

        let saltRounds = 10;

        bcrypt.hash(password, saltRounds, async function(err, hash) {
            const user = new User({
            username : username,
            password : hash,
            type : type
            });

            const userData = await user.save();

            res.status(200).send({success: true, msg: "done", data: userData});
        });

};

// authenticate the user

const auth_user =  async (req, res) =>{

    try{

        // const hashpassword = bcrypt.hash(req.password, saltRounds);

        const {username, password} = req.body;

        let user_check = await User.findOne({username: username});

        if(!user_check){
            return res.status(401).send('User does not exist.');
        }

        bcrypt.compare(password, user_check.password, (err, result) =>{

            if(result){
                const sessionId = uuidv4();
                setUser(sessionId, user_check);

                return res.cookie('uid', sessionId).status(200).send("User logged in successfully.");
            }

            return res.status(401).send("Invalid Credentials");
        });
        
    }catch(error){
        res.status(400).send(error);
    }
};

module.exports={
    registerUser,
    auth_user
}