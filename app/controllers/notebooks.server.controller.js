'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors'),
	Notebook = mongoose.model('Notebook'),
	_ = require('lodash');

/**
 * Create a Notebook
 */
exports.create = function(req, res) {
	var notebook = new Notebook(req.body);
	notebook.user = req.user;

	notebook.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(notebook);
		}
	});
};

/**
 * Show the current Notebook
 */
exports.read = function(req, res) {
	res.jsonp(req.notebook);
};

/**
 * Update a Notebook
 */
exports.update = function(req, res) {
	var notebook = req.notebook ;

	notebook = _.extend(notebook , req.body);

	notebook.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(notebook);
		}
	});
};

/**
 * Delete an Notebook
 */
exports.delete = function(req, res) {
	var notebook = req.notebook ;
	console.log(req.body);
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

/**
 * List of Notebooks
 */
exports.list = function(req, res) { Notebook.find().where('user', req.user.id).sort('-created').populate('user', 'displayName').exec(function(err, notebooks) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(notebooks);
		}
	});
};

/**
 * Notebook middleware
 */
exports.notebookByID = function(req, res, next, id) { Notebook.findById(id).populate('user', 'displayName').exec(function(err, notebook) {

	if (err) return next(err);
		if (! notebook) return next(new Error('Failed to load Notebook ' + id));
		req.notebook = notebook ;
		next();
	});
};

/**
 * Notebook authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.notebook.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
