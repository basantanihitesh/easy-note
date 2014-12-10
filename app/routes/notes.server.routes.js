'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users');
	var notes = require('../../app/controllers/notes');

	// Notes Routes
	app.route('/notes')
		.get(notes.list)
		.post(users.requiresLogin, notes.create);

	app.route('/notes/:noteId')
		.get(notes.read)
		.put(users.requiresLogin, notes.hasAuthorization, notes.update);
		//.delete(users.requiresLogin, notes.hasAuthorization, notes.delete);

	app.route('/notes/populate/:notebookId')
		.get(notes.populate);


	app.route('/notes/note/update')
		.put(notes.updateNote);

	app.route('/notes/note/shownote/:noteID')
		.get(notes.showNote);

	app.route('/notes/note/:notebookId/deletenote/:noteID')
		.delete(notes.deletenote);

	// Finish by binding the Note middleware
	app.param('noteId', notes.noteByID);
	app.param('notebookId', notes.notebookId);
	app.param('noteID', notes.noteID);

};
