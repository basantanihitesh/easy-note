'use strict';

var mongoose = require('mongoose'),
	errorHandler = require('./errors'),
	Notebook = mongoose.model('Notebook'),
	_ = require('lodash');

/**
 * Module dependencies.
 */
exports.index = function(req, res) {
	res.render('index', {
		user: req.user || null
	});
};

exports.delete = function(req, res) {
	var notebook = req.notebook ;
	console.log('MADARCHOT');
	notebook.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(notebook);
		}
	});
};
