var express = require('express');
var router = express.Router();

const rp = require('request-promise');
const cheerio = require('cheerio');

const options = {
  uri: 'https://vejr.eu/api.php?location=Copenhagen&degree=C',
  transform: function(body){
    return cheerio.load(body);
  }
};


/* GET home page. */
router.get('/', function(req, res, next) {

  res.render('index', { title: 'Digital Twins' });
});

module.exports = router;
