const express = require('express');
const router = express.Router();
const Account = require('../controllers/AcountController');


router.post('/verifyregister',Account.register);
router.post('/verifylogin',Account.login);
router.get('/logout',Account.loggout);

router.get('/', (req, res, next) => {
   res.render('login');
});


module.exports = router;