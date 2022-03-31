// const Helper = require('./Helper');
const db = require('../config/db/DBconnection');
const bcrypt = require('bcrypt');

exports.login = async (req, res, next) => {
    try{
        if(!req.body.name || !req.body.password){
            throw 'Fail';
        }
        const userInput = {
            user: req.body.name,
            password: req.body.password
        }

        const user = await db.collection('users').get();
        user.forEach((doc) => {
            if(userInput.user === doc.data().username || userInput.user === doc.data().email){
                if (bcrypt.compareSync(userInput.password, doc.data().password)) {
                    req.session.user = doc.id;
                }
                else {
                    throw 'password'
                }
            }
        });
        if(req.session.user)
            res.status(200).send('success');
        else throw 'user';
    }   
    catch(err) {
        res.send(err);
    }
}


exports.register = async (req, res, next) => {
    try{
        if(!req.body.username || !req.body.email || !req.body.password){
            throw 'Fail';
        }
        const data = {
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        }
        const user = await db.collection('users').get();
        user.forEach((doc) => {
            if(data.username === doc.data().username){
                throw 'username';
            }
            else if(data.email === doc.data().email){
                throw 'email';
            }
        });
        var pwd = data.password;
        data.password = bcrypt.hashSync(pwd, 10);
    
        const setdata = await db.collection('users').add({
            username: data.username,
            email: data.email,
            password: data.password,
            cart:[]
        });
        console.log('Added document with ID: ', setdata.id);
        res.status(200).send('success');
    }   
    catch(err) {
        res.send(err);
    }
    
}

exports.loggout = (req, res, next) => {
    // res.json("Loggout");
    if (req.session.user) {
        req.session.destroy(() => {
            req.session = null;
            res.redirect('/');
        });
    }
}