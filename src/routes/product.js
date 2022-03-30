const express = require('express');
const router = express.Router();
const Product = require('../controllers/ProductController');

router.get('/:name',Product.getItem);
router.get('/add/:id',Product.add);

module.exports = router;