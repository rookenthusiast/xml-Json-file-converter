var fs = require("fs");

var XmlDataExtractor = function(){

}

var XmlDataExtractor.prototype = {
	
	getDirectoryData: function(dir){
		fileList = [];

		var files = fs.readdirSync(dir);
		for (file in files){
			fileList.push(file);
		}
		console.log(fileList);

	}
}

module.exports = XmlDataExtractor;