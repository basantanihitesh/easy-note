'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users');
	var notebooks = require('../../app/controllers/notebooks');

	// Notebooks Routes
	app.route('/notebooks')
		.get(users.requiresLogin,notebooks.list)
		.post(users.requiresLogin, notebooks.create);


	app.route('/notebooks/:notebookId')
		.get(users.requiresLogin, notebooks.read)
		.put(users.requiresLogin, notebooks.hasAuthorization, notebooks.update)
		.delete(users.requiresLogin, notebooks.hasAuthorization, notebooks.delete);

	// Finish by binding the Notebook middleware
	app.param('notebookId', notebooks.notebookByID);
};
