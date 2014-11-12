'use strict';

module.exports = {
	app: {
		title: 'Note Application',
		description: 'Full-Stack JavaScript with MongoDB, Express, AngularJS, and Node.js',
		keywords: 'MongoDB, Express, AngularJS, Node.js'
	},
	port: process.env.PORT || 3000,
	templateEngine: 'swig',
	sessionSecret: 'MEAN',
	sessionCollection: 'sessions',
	assets: {
		lib: {
			css: [
				'public/lib/bootstrap/dist/css/bootstrap.css',
				'public/lib/bootstrap/dist/css/bootstrap-theme.css',
				'http://netdna.bootstrapcdn.com/font-awesome/4.0.0/css/font-awesome.min.css'
			],
			js: [
				'http://code.jquery.com/jquery-latest.min.js',
				'public/lib/angular/angular.js',
				'public/lib/angular-resource/angular-resource.js', 
				'public/lib/angular-ui-router/release/angular-ui-router.js',
				'public/lib/angular-ui-utils/ui-utils.js',
				'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.0/js/bootstrap.min.js',
				'public/lib/angular-bootstrap/ui-bootstrap-tpls.js',
				'https://ajax.googleapis.com/ajax/libs/angularjs/1.2.4/angular-sanitize.min.js',
				'http://cdnjs.cloudflare.com/ajax/libs/textAngular/1.1.2/textAngular.min.js'
			]
		},
		css: [
			'public/modules/**/css/*.css'
		],
		js: [
			'public/config.js',
			'public/application.js',
			'public/modules/*/*.js',
			'public/modules/*/*[!tests]*/*.js'
		],
		tests: [
			'public/lib/angular-mocks/angular-mocks.js',
			'public/modules/*/tests/*.js'
		]
	}
};
