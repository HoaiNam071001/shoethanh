const express = require('express');
const router = express.Router();
const Cart = require('../controllers/CartController');

router.get('/redirect',Cart.redirect);
router.get('/pay',Cart.pay);
router.get('/update/:opt',Cart.opt);
router.get('/', Cart.get);

module.exports = router;