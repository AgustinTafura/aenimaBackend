var express = require('express')
var router = express.Router()

router.route('/')
    .get((req,res)=>{
        res.send('jk alsdljka s;ldkalsl dkla;skd')
    })

module.exports = router;