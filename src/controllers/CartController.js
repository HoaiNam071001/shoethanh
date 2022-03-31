// const Helper = require('./Helper');
const db = require('../config/db/DBconnection');

exports.get = async (req, res, next) => {
    if(req.session.user){
        const item = await db.collection('users').get();
        var i= true;
        item.forEach((doc) => {
            if(req.session.user === doc.id){
                var data =doc.data().cart, sum=0;
                doc.data().cart.forEach((cart) =>{
                    sum+= cart.quantity*cart.price;
                })
                data = {'cart':data,'sum':sum};
                i = false;
                res.render('pages/cart',{data});
            }
        });
        if(i) res.json({message: 'Vui lòng đăng nhập'});
    }
    else res.render('pages/cart');
}

exports.opt = async (req, res, next) => {
    try{
        if(req.session.user){
            const item = await db.collection('users').doc(req.session.user).get();
            var carts = item.data().cart, sum=0,length = 0, i=0, k=0;
            carts.forEach((cart) => {
                if(req.query.id === cart.id && req.query.color === cart.color && req.query.size === cart.size){
                    if(req.params.opt === 'tang'){
                        cart.quantity++;
                    }
                    else if(req.params.opt === 'giam'){
                        cart.quantity--;
                    }
                    length = cart.quantity;
                    k = i;
                }
                i++;
                sum += cart.quantity*cart.price;
            });
            if(length === 0) carts.splice(k, 1);


            db.collection('users').doc(req.session.user).update({'cart': carts});
            res.json({'length':length,'sum':sum});
        }
        else res.json({message: 'Vui lòng đăng nhập'});
    }
    catch(err) {
        res.send(err);
    }
    
}

exports.pay = async (req, res, next) => {
    try{    
        if(!req.query.price) throw '400';
        if(!req.session.user) throw 'Vui lòng đăng nhập';
        var partnerCode = "MOMOORT320220328";
        var accessKey = "TKTFTiCBGFBqRuYc";
        var secretkey = "9teO31VMuchzAQcXJydcjRPwiTk9sBjK";
        var requestId = partnerCode + new Date().getTime();
        var orderId = requestId;
        var orderInfo = "pay_with_MoMo";
        var redirectUrl = "https://momo.vn/return";
        var ipnUrl = "https://callback.url/notify";
        var amount = req.query.price;
        var requestType = "captureWallet"
        var extraData = ""; //pass empty value if your merchant does not have stores

        //before sign HMAC SHA256 with format
        //accessKey=$accessKey&amount=$amount&extraData=$extraData&ipnUrl=$ipnUrl&orderId=$orderId&orderInfo=$orderInfo&partnerCode=$partnerCode&redirectUrl=$redirectUrl&requestId=$requestId&requestType=$requestType
        var rawSignature = "accessKey="+accessKey+"&amount=" + amount+"&extraData=" + extraData+"&ipnUrl=" + ipnUrl+"&orderId=" + orderId+"&orderInfo=" + orderInfo+"&partnerCode=" + partnerCode +"&redirectUrl=" + redirectUrl+"&requestId=" + requestId+"&requestType=" + requestType
        //puts raw signature
        console.log("--------------------RAW SIGNATURE----------------")
        console.log(rawSignature)
        //signature
        //var signature = hmacSHA512(rawSignature,secretkey);
        const crypto = require('crypto');
        var signature = crypto.createHmac('sha256', secretkey)
        .update(rawSignature)
        .digest('hex');
        console.log("--------------------SIGNATURE----------------")
        console.log(signature)

        //json object send to MoMo endpoint
        const requestBody = JSON.stringify({
            partnerCode : partnerCode,
            accessKey : accessKey,
            requestId : requestId,
            amount : amount,
            orderId : orderId,
            orderInfo : orderInfo,
            redirectUrl : redirectUrl,
            ipnUrl : ipnUrl,
            extraData : extraData,
            requestType : requestType,
            signature : signature,
            lang: 'en'
        });
    //Create the HTTPS objects
        const https = require('https');
        const options = {
            hostname: 'test-payment.momo.vn',
            port: 443,
            path: '/v2/gateway/api/create',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(requestBody)
            }
        }
        //Send the request and get the response
        const request = https.request(options, response => {
            console.log(`Status: ${response.statusCode}`);
            console.log(`Headers: ${JSON.stringify(response.headers)}`);
            response.setEncoding('utf8');
            response.on('data', async (body) => {
                // console.log('Body: ');
                // console.log(body);
                // console.log('payUrl: ');
                // console.log(JSON.parse(body).payUrl);
                res.send({ 'url': JSON.parse(body).payUrl});

                const item = await db.collection('users').doc(req.session.user).get();
                var carts = item.data().cart;

                db.collection('users').doc(req.session.user).update({'cart': []});
                await db.collection('orders').add({
                    iduser: req.session.user,
                    fullname:req.query.name,
                    phonenumber:req.query.number,
                    orderid:JSON.parse(body).orderId,
                    address: req.query.address,
                    pricetotal: req.query.price,
                    products: carts
                });
            });
            response.on('end', () => {
                console.log('No more data in response.');
            });
        })

        request.on('error', (e) => {
            console.log(`problem with request: ${e.message}`);
        });
        // write data to request body
        request.write(requestBody);
        request.end();

    }
    catch(e){
        res.status(400).send(e);
    }
}

exports.redirect = async (req, res, next) => {
    console.log(req.query);
    res.json({message: 'Vui lòng đăng nhập'});
}
