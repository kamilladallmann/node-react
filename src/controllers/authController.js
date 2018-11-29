const express = require('express');
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const authConfig = require('../config/auth');

const router = express.Router();

function generateToken(params = {}){
    return jwt.sign(params, authConfig.secret, {
        expiresIn: 86400, //um dia
    });
}

router.post('/register', async(req, res) => {
    const {email} = req.body;

    try{
        if(await User.findOne({email})){
            return res.status(400).send({error: 'User already exists'});
        }            
        const user = await User.create(req.body);

        user.password = undefined;

        /* token = generateToken({id: user.id});

    console.log(token);

    req.headers.authorization = "Bearer " + token;

    console.log(req.headers.authorization); */
        /* return res.send({
            user,
            token: generateToken({id: user.id}),
        }); */
        res.redirect('/auth/login');
    }catch(err){
        return res.status(400).send({error: 'Registration failed'});
    }
});

router.post('/login', async(req, res, next) => {
    const {email, password} = req.body;
    
    const user = await User.findOne({email}).select('+password');

    if(!user)
        return res.status(400).send({error: 'User not found'});
    
    if(!await bcrypt.compare(password, user.password))
        return res.status(400).send({error: 'Invalid password'});

     var token = generateToken({id: user.id}); //jwt.sign({id: user.id}, authConfig.secret);

    user.token = token;
    
     res.status(200).send({ auth: true, token: token });
    
    //res.redirect('/photos');
    /* res.send({
        user, 
        token: generateToken({id: user.id})
    }); */   
});

module.exports = app => app.use('/auth', router);
