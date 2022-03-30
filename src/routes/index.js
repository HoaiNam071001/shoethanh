const homeRouter = require('./home');
const product = require('./product');
const cart = require('./cart');
const login = require('./login');

function route(app) {
    app.use('/product', product);
    app.use('/cart', cart);
    app.use('/login', login);
    app.use('/', homeRouter);
}

module.exports = route; 