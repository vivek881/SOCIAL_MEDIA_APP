const express = require('express');
const router = express.Router();
router.get('/',function(req,res){
    res.send('<h1>cool</h1>');
});
// for any further routes, access from here
// router.use('/routerName', require('./routerfile));


module.exports = router;