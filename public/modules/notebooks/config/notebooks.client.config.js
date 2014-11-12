'use strict';

// Configuring the Articles module
angular.module('notebooks').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Notebooks', 'notebooks', 'dropdown', '/notebooks(/create)?');
		Menus.addSubMenuItem('topbar', 'notebooks', 'List Notebooks', 'notebooks');
		Menus.addSubMenuItem('topbar', 'notebooks', 'New Notebook', 'notebooks/create');
	}
]);