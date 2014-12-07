'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Note Schema
 */
var NoteSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Note name',
		trim: true
	},
	created: {
		type: Date,
		default: Date.now
	},
	notebookId:
	{
		type: String,
		trim:true
	},
	content:
	{
		type: String,
		trim: true
	}
});

mongoose.model('Note', NoteSchema);
