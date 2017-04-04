var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var fs = require('fs');
var parseString = require('xml2js').parseString;
var DatabaseQuery = require('./db/databaseQuery')

var dataBase = new DatabaseQuery(); 
this.url = 'mongodb://localhost:27017/companyFinances';
var processDir = function(){
	console.log('finding directory')
	var totalBytes = 0;
	var dir = '/home/cameron/Documents/xml_data';
	fs.readdir(dir, function(err, files){
		if (err) {
			console.log("cant find directory") 
		} else {
			console.log('attempting to read files')
			var filesCompleted = 0;
			files.forEach(function(file){
				fs.readFile(dir + '/' + file, 'UTF-8',function(err,data){
					if (err) {
						console.log("error reading file", err);
					} else {
						console.log("beginning conversion of: " + file)
						var convertedXmlFile = convertXmlToJson(data);
						filesCompleted += 1;
						dataBase.add(convertedXmlFile);
						console.log("File has been added to Database");

					}
				totalBytes += data.length;
				if (filesCompleted === files.length){
						console.log("total bytes of data:" + totalBytes);
						console.log(filesCompleted + ": file conversions completed")
						dataBase.all();
					}
				})
			})
		}
	})
}

var convertXmlToJson = function(xml){
	parseString(xml, function(err, result){
		if(err){
			console.log("There's been an error converting data:", err)
		} else {
		var jsonData = JSON.stringify(result);
		return jsonData;
		}
    })
}


processDir();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static('client/build'));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + '/../client/build/index.html'));
});

app.listen(3000, function () {
  console.log('server running at '+this.address().port);
});