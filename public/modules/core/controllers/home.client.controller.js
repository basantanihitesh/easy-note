'use strict';

angular.module('core').controller('HomeController', ['$scope', '$stateParams', '$location', '$http', 'Authentication', 'Articles', 'Notebooks',
    function ($scope, $stateParams, $location, $http, Authentication, Articles, Notebooks) {
        // This provides Authentication context.
        $scope.authentication = Authentication;

        $scope.orightml = 'TEST Content';
        $scope.htmlcontent = $scope.orightml;
        $scope.disabled = false;

        // ----------- NOTE STUFF ---------------//

        //new note
        $scope.newNote = function (notebook) {
            alert(notebook._id);
        }

        //show note/ get note from database
        $scope.showNote = function ($event) {
            var content = $event.target.attributes['data-content'].value;
            $scope.htmlcontent = content;
            $scope.noteTitle = 'Something';
        }

        //save note button
        $scope.saveNote = function () {
            //save post to server from here
            alert($scope.htmlcontent);
        }


        //----------NOTEBOOK STUFF---------------//

        //populate all notebooks
        $scope.find = function () {
            $scope.notebooks = Notebooks.query();
        };

        //create new notebook
        $scope.newNotebook = function () {
            var notebook = new Notebooks({
                name: this.noteTitle
            });
            notebook.$save(function (response) {
                $location.path('/');
                $scope.find();
                $scope.noteTitle = '';
            }, function (errorResponse) {
                $scope.error = errorResponse.data.message;
            });

        }

        //delete a notebook
        $scope.deleteNotebook = function (notebook) {
            $scope.notebookDel = Notebooks.get({
                notebookId: notebook._id
            });
            if ($scope.notebookDel) {
                $http.delete('/notebooks/' + notebook._id);

                for (var i in $scope.notebooks) {
                    if ($scope.notebooks [i] === notebook) {
                        $scope.notebooks.splice(i, 1);
                    }
                }
            }
        }

        //populate all notes from database
        $scope.populateNotes = function (notebook) {
            $scope.addNoteButton = notebook;
            $scope.notebookTitle = notebook.name;
            //populate from db
            $scope.notes = [
                {
                    id: '1',
                    'title': 'Bring Title',
                    content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
                },
                {
                    id: '2',
                    'title': 'Have a meeting tomorrow',
                    content: ' Ipsum is simply dummy text of the printing and typesetting industry.'
                },
                {
                    id: '3',
                    'title': 'Quick Shortcuts to MAC',
                    content: '  is simply dummy text of the printing and typesetting industry.'
                },
                {
                    id: '4',
                    'title': 'Assignments for tomorrow',
                    content: 'Lorem Ipsum is simply dummy text of the printing and  industry.'
                },
                {
                    id: '5',
                    'title': 'Grocery Reminder',
                    content: 'Lorem Ipsum is simply dummy text of and typesetting industry.'
                }
            ]
        }
    }]);
