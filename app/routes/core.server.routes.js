'use strict';

module.exports = function(app) {
	// Root routing
	var core = require('../../app/controllers/core');
	var notebooks = require('../../app/controllers/notebooks');

	app.route('/')
		.get(core.index)
		.delete(notebooks.delete);
};
