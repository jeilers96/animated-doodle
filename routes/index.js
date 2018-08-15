var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {

    //setup db connection
    var db = req.db;
    var collection = db.get('films');

    //setup default variables
    var options = {};
    var query = {};
    var currentGenre = "All";
    var currentDirector = "All";
    var currentQueryParams = "";

    //set query and current filter
    if(req.query.genre != null) {
      query = { Genre: req.query.genre };
      currentGenre = req.query.genre;
    }
    if(req.query.director != null) {
      query = { Director: req.query.director};
      currentDirector = req.query.director;
    }

    //set query to sort correctly
    if(req.query.sortby == "alphabetical") {
      options = { sort: { Title: 1 } };
    } else if(req.query.sortby == "releaseYear") {
      options = { sort: {Year: 1} };
    } else if(req.query.sortby == "Runtime") {
      options = { sort: {Runtime: 1} };
    } else if(req.query.sortby == "alphabeticalRev") {
      options = { sort: { Title: -1 } };
    } else if(req.query.sortby == "releaseYearRev") {
      options = { sort: {Year: -1} };
    } else if(req.query.sortby == "RuntimeRev") {
      options = { sort: {Runtime: -1} };
    }

    //get collection and send correct attributes to View
    collection.find(query, options, function(e, films) {
      collection.distinct('Genre', function(e, genres) {
        collection.distinct('Director', function(e, directors) {
          res.render('index', {
              "currentQueryParams" : currentQueryParams,
              "currentGenre" : currentGenre,
              "currentDirector" : currentDirector,
              "filmlist" : films,
              "genres" : genres,
              "directors" : directors,
              title: "Josh's Film Collection"
          });
        });
      });
    });
});

module.exports = router;
