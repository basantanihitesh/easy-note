'use strict';

// Notebooks controller
angular.module('notebooks').controller('NotebooksController', ['$scope', '$stateParams', '$location', 'Authentication', 'Notebooks',
	function($scope, $stateParams, $location, Authentication, Notebooks ) {
		$scope.authentication = Authentication;

		// Create new Notebook
		$scope.create = function() {
			// Create new Notebook object
			var notebook = new Notebooks ({
				title: this.name
			});

			// Redirect after save
			notebook.$save(function(response) {
				$location.path('notebooks/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Notebook
		$scope.remove = function( notebook ) {
			if ( notebook ) { notebook.$remove();

				for (var i in $scope.notebooks ) {
					if ($scope.notebooks [i] === notebook ) {
						$scope.notebooks.splice(i, 1);
					}
				}
			} else {
				$scope.notebook.$remove(function() {
					$location.path('notebooks');
				});
			}
		};

		// Update existing Notebook
		$scope.update = function() {
			var notebook = $scope.notebook ;

			notebook.$update(function() {
				$location.path('notebooks/' + notebook._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Notebooks
		$scope.find = function() {
			$scope.notebooks = Notebooks.query();
		};

		// Find existing Notebook
		$scope.findOne = function() {
			$scope.notebook = Notebooks.get({ 
				notebookId: $stateParams.notebookId
			});
		};
	}
]);
