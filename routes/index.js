var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: "Josh's Film Collection" });
});

router.get('/filmlist', function(req, res) {
    var db = req.db;
    var collection = db.get('films');
    collection.find({},{},function(e,docs){
        res.render('filmlist', {
            "filmlist" : docs
        });
    });
});

module.exports = router;
