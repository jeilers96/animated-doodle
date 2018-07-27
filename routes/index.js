var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
    var db = req.db;
    var collection = db.get('films');
    var genreCollection = db.get('genres');
    collection.find({},{},function(e,films){
      genreCollection.find({},{},function(e, genres) {
        res.render('index', {
            "filmlist" : films,
            "genres" : genres,
            title: "Josh's Film Collection"
        });
      });
    });
});

router.get('/genre/:genre', function(req, res) {
    var db = req.db;
    var collection = db.get('films');
    var genreCollection = db.get('genres');
    collection.find({Genre: req.params.genre},{},function(e,films){
      genreCollection.find({},{},function(e, genres) {
        res.render('index', {
            "filmlist" : films,
            "genres" : genres,
            title: "Josh's Film Collection"
        });
      });
    });
});

module.exports = router;
