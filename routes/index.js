var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
    var db = req.db;
    var collection = db.get('films');
    var options = {};
    var query = {};
    if(req.query.genre != null) {
      query = { Genre: req.query.genre };
    }
    if(req.query.sortby == "alphabetical") {
      options = { sort: { Title: 1 } };
    } else if(req.query.sortby == "releaseYear") {
      options = { sort: {Year: 1} };
    } else if(req.query.sortby == "Runtime") {
      options = { sort: {Runtime: 1} };
    }
    collection.find(query, options, function(e, films) {
      collection.distinct('Genre', function(e, genres) {
        res.render('index', {
            "currentGenre" : "All",
            "filmlist" : films,
            "genres" : genres,
            title: "Josh's Film Collection"
        });
      });
    });
});

module.exports = router;
