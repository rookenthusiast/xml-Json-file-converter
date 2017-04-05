/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {



var UI = function (){
	this.entry();
}

UI.prototype = { 
 
	entry: function(){
		console.log("entry has been called")
		var body = document.querySelector('body');
		var header = document.createElement('h1');
		var info = document.createElement('h2');
		header.innerHTML = "Welcome to XML extractor app"
		info.innerHTML = "To begin processing data stored in your specified directory click process or view the database for all returned debit items "
		body.appendChild(header);
		body.appendChild(info);

		var form = document.createElement('form');
		form.method = "post";
		form.action = "/"
		
		var input = document.createElement('input');
		input.type = "submit";
		input.value = "Process";
		input.onclick = this.processMessage;

		form.appendChild(input);
		body.appendChild(form);

		var button = document.createElement('button')
		button.innerHTML = "Returned Debit Data";
		button.onclick = this.loadReturnedDebitItems;
		body.appendChild(button);
	},

	processMessage: function(){
		setTimeout(function() { alert("Files have been processed"); }, 3000);
	},

	loadReturnedDebitItems: function() {
		console.log("return debit items fired")
  var request = new XMLHttpRequest();
  request.open("GET", "http://localhost:3000/loadReturnedDebitItems");
  request.send(null);
  request.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var body = document.querySelector("body");
      var p = document.createElement('p');
      p.innerHTML = this.responseText;
      body.appendChild(p);
    }
  };
}

	

}

module.exports = UI;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

var UI = __webpack_require__(0);

var app = function() {
  var ui = new UI();
  
}

window.onload = app;

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map