var express = require('express');
var bodyParser = require('body-parser');
var app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static('client/build'));
// app.use("/", require("/client/build/index.html"));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + '/../client/build/index.html'));
});

app.listen(3000, function () {
  console.log('server running at '+this.address().port);
});