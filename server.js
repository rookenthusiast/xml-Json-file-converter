var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var XmlExtractor = require('./db/xmlExtractor.js');
var xmlExtractor = new XmlExtractor();
var DatabaseQuery = require('./db/databaseQuery')
var database = new DatabaseQuery();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static('client/build'));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + '/../client/build/index.html'));
});

app.get('/loadReturnedDebitItems', function (req, res) {
  database.all('ReturnedDebitItems', function(docs) {
  	res.json(docs);
  })
})

app.post('/', function (req, res) {
	xmlExtractor.processDir();
});

app.listen(3000, function () {
  console.log('server running at '+this.address().port);
});