// const Helper = require('./Helper');
const db = require('../config/db/DBconnection');

exports.getItem = async (req, res, next) => {
    const item = await db.collection('products').get();
    var i = true;
    item.forEach((doc) => {
        if(doc.id === req.params.name){
            i = false;
            var data ={id: doc.id,...doc.data()} ;
            res.render('pages/product',{data}); 
            return;
        }
    });
    if(i) res.json('Invalid!');
}
exports.add = async (req, res, next) => {
    try{
        if(!req.params.id){
            throw 'Fail';
        }
        const it = await db.collection('users').doc(req.session.user).get();
        var carts = it.data().cart;
        var i=true;

        carts.forEach((cart) => {
            if(req.params.id === cart.id && req.query.color === cart.color && req.query.size === cart.size){
                cart.quantity++;
                i=false;
            }
        })

        if(i){
            var cart = [
                {
                    name: req.query.name,
                    img:req.query.image,
                    color:req.query.color,
                    size:req.query.size,
                    price:req.query.price,
                    id:req.params.id,
                    quantity:1
                },...carts];
            db.collection('users').doc(req.session.user).update({'cart': cart});
        }    
        else   {
             db.collection('users').doc(req.session.user).update({'cart': carts});
        } 
        res.json("success");
    }
    catch(err) {
        res.send(err);
    }
}

