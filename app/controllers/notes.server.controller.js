'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors'),
	Note = mongoose.model('Note'),
	_ = require('lodash');
var dropbox_notes = require('./dropbox_note');

/**
 * Create a Note
 */
exports.create = function(req, res) {
	var note = new Note(req.body);
	console.log('note coming to server: ' + note);
	note.user = req.user;

	note.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			dropbox_notes.createFileInDropBox(note);
			res.jsonp(note);
		}
	});
};

/**
 * Show the current Note
 */
exports.read = function(req, res) {
	res.jsonp(req.note);
};

/**
 * Update a Note
 */
exports.update = function(req, res) {
	var note = req.note ;

	note = _.extend(note , req.body);

	note.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			dropbox_notes.createFileInDropBox(note);
			res.jsonp(note);
		}
	});
};

/**
 * Delete an Note
 */
exports.deletenote = function(req, res) {

	Note.findOneAndRemove({'_id': req.noteID}, function(err,doc){
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			console.log('doc : '+doc);
			dropbox_notes.deleteFileInDropBox(req.notebookId,doc.name);
		}


		});
};

/**
 * List of Notes
 */
exports.list = function(req, res) { Note.find().sort('-created').populate('user', 'displayName').exec(function(err, notes) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(notes);
		}
	});
};

/**
 * Note middleware
 */
exports.noteByID = function(req, res, next, id) { Note.findById(id).populate('user', 'displayName').exec(function(err, note) {
		if (err) return next(err);
		if (! note) return next(new Error('Failed to load Note ' + id));
		req.note = note ;
		next();
	});
};

/**
 * Note authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.note.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
exports.populate = function(req, res) {
	Note.find({'notebookId': req.notebookId}, 'name notebookId content', {sort:{'created':-1}},function(err, note){
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(note);
		}

	});
};
exports.updateNote = function(req, res) {

	var query = {'_id': req.param('_id')};
	var update = {'content': req.param('content')};
		Note.findOneAndUpdate(query,update, function(err, note,raw){
		if (err) {
			return res.status(400).send({

				message: errorHandler.getErrorMessage(err)
			});
		} else {
			console.log('reached here');
			dropbox_notes.createFileInDropBox(note);
			res.jsonp(note.content);
		}

	});
};
exports.notebookId = function(req, res,next,name) {
	req.notebookId = name;
	next();
};
exports.noteName = function(req, res,next,name) {
	req.noteName = name;
	next();
};

exports.showNote = function(req, res) {
	Note.find({'_id': req.noteID}, 'content', function(err, note){
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(note.content);

		}

	});
};

exports.noteID = function(req, res,next,name) {

	console.log('note Id: ' + name);
	req.noteID = name;
	next();
};
