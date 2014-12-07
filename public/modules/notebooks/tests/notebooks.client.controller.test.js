'use strict';

(function() {
	// Notebooks Controller Spec
	describe('Notebooks Controller Tests', function() {
		// Initialize global variables
		var NotebooksController,
		scope,
		$httpBackend,
		$stateParams,
		$location;

		// The $resource service augments the response object with methods for updating and deleting the resource.
		// If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
		// the responses exactly. To solve the problem, we define a new toEqualData Jasmine matcher.
		// When the toEqualData matcher compares two objects, it takes only object properties into
		// account and ignores methods.
		beforeEach(function() {
			jasmine.addMatchers({
				toEqualData: function(util, customEqualityTesters) {
					return {
						compare: function(actual, expected) {
							return {
								pass: angular.equals(actual, expected)
							};
						}
					};
				}
			});
		});

		// Then we can start by loading the main application module
		beforeEach(module(ApplicationConfiguration.applicationModuleName));

		// The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
		// This allows us to inject a service but then attach it to a variable
		// with the same name as the service.
		beforeEach(inject(function($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_) {
			// Set a new global scope
			scope = $rootScope.$new();

			// Point global variables to injected services
			$stateParams = _$stateParams_;
			$httpBackend = _$httpBackend_;
			$location = _$location_;

			// Initialize the Notebooks controller.
			NotebooksController = $controller('NotebooksController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Notebook object fetched from XHR', inject(function(Notebooks) {
			// Create sample Notebook using the Notebooks service
			var sampleNotebook = new Notebooks({
				name: 'New Notebook'
			});

			// Create a sample Notebooks array that includes the new Notebook
			var sampleNotebooks = [sampleNotebook];

			// Set GET response
			$httpBackend.expectGET('notebooks').respond(sampleNotebooks);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.notebooks).toEqualData(sampleNotebooks);
		}));

		it('$scope.findOne() should create an array with one Notebook object fetched from XHR using a notebookId URL parameter', inject(function(Notebooks) {
			// Define a sample Notebook object
			var sampleNotebook = new Notebooks({
				name: 'New Notebook'
			});

			// Set the URL parameter
			$stateParams.notebookId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/notebooks\/([0-9a-fA-F]{24})$/).respond(sampleNotebook);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.notebook).toEqualData(sampleNotebook);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Notebooks) {
			// Create a sample Notebook object
			var sampleNotebookPostData = new Notebooks({
				name: 'New Notebook'
			});

			// Create a sample Notebook response
			var sampleNotebookResponse = new Notebooks({
				_id: '525cf20451979dea2c000001',
				name: 'New Notebook'
			});

			// Fixture mock form input values
			scope.name = 'New Notebook';

			// Set POST response
			$httpBackend.expectPOST('notebooks', sampleNotebookPostData).respond(sampleNotebookResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Notebook was created
			expect($location.path()).toBe('/notebooks/' + sampleNotebookResponse._id);
		}));

		it('$scope.update() should update a valid Notebook', inject(function(Notebooks) {
			// Define a sample Notebook put data
			var sampleNotebookPutData = new Notebooks({
				_id: '525cf20451979dea2c000001',
				name: 'New Notebook'
			});

			// Mock Notebook in scope
			scope.notebook = sampleNotebookPutData;

			// Set PUT response
			$httpBackend.expectPUT(/notebooks\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/notebooks/' + sampleNotebookPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid notebookId and remove the Notebook from the scope', inject(function(Notebooks) {
			// Create new Notebook object
			var sampleNotebook = new Notebooks({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Notebooks array and include the Notebook
			scope.notebooks = [sampleNotebook];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/notebooks\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleNotebook);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.notebooks.length).toBe(0);
		}));
	});
}());