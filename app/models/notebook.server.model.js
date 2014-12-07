'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Notebook Schema
 */
var NotebookSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Notebook title',
		trim: true
	},
	created: {
		type: Date,
		default: Date.now
	},
	/*notes:{
		type: Schema.ObjectId,
		ref: 'Notes'
	},*/
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('Notebook', NotebookSchema);
