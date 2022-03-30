const express = require('express');
const router = express.Router();
const Home = require('../controllers/HomeController');

// router.get('/add', Home.add);

router.get('/', Home.getmenu);

module.exports = router;