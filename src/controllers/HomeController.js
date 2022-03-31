// const Helper = require('./Helper');
const db = require('../config/db/DBconnection');
const axios = require('axios');

exports.getmenu = async (req, res, next) => {    
    const product = await db.collection('products').get();
    var data = [];
    product.forEach((doc) => {
        data.push({id:doc.id,...doc.data()})
    }); 
    res.render('index',{data});
}
// exports.add = async (req, res, next) => {  
//     var datas = [] , item;  
//     axios('https://s3-us-west-2.amazonaws.com/s.cdpn.io/1315882/shoes.json')
//     .then((resp) =>{
//         resp.data.shoes.forEach((data)=>{
//             item = {
//                 color:[ 'blue','green','red','orange'],
//                 description: data.description,
//                 name: data.name,
//                 price: data.price,
//                 product_img: [data.image],
//                 size: ['38','39','40','41','42']
//             }
//             const A = async ()=>{
//                 await db.collection('products').add(item);
//             }
//             A();
//             datas.push(item);
//         })
//         res.json(datas);
//     })
// }