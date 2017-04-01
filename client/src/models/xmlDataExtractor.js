var fs = require("fs");

var xmlDataExtractor = function(){

}

var xmlDataExtractor.prototype = {
	getDirectoryData: function(dir){
		fileList = [];

		var files = fs.readdirSync(dir);
		for (file in files){
			fileList.push(file);
		}
		console.log(fileList);

	}
}

module.exports = xmlDataExtractor;