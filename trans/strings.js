const config = require('../config'),
	  fs = require('fs'),
	  path = require('path');
	  
module.exports = JSON.parse(fs.readFileSync(path.join(__dirname, config.locale.lang+".json")));