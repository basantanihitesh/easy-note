'use strict';

angular.module('core').controller('HomeController', ['$scope', '$stateParams', '$location', '$http', 'Authentication', 'Articles', 'Notebooks','Notes',
    function ($scope, $stateParams, $location, $http, Authentication, Articles, Notebooks, Notes) {
        // This provides Authentication context.
        $scope.authentication = Authentication;

        $scope.orightml = '';
        $scope.htmlcontent = $scope.orightml;
        $scope.disabled = false;

        // ----------- NOTE STUFF ---------------//

        //new note
        $scope.newNote = function() {

            $scope.notebookId = this.notebook._id;
            //console.log(this.notebook._id);
            var note = new Notes({
                name: this.noteTitle,
                notebookId:  $scope.notebookId,
                content: ''
            });

            note.$save(function (response) {
                $location.path('/');
                $scope.find();
                $scope.notebookTitle = '';
                $scope.noteTitle='';
                $scope.populateNotes( $scope.notebookId);


            }, function (errorResponse) {
                $scope.error = errorResponse.data.message;
            });

        };

        //show note/ get note from database
        $scope.showNote = function ($event, noteId) {
            var content = $event.target.attributes['data-content'].value;
           console.log('content: ' + content);
            $scope.htmlcontent = content;
            $scope.noteId = noteId;


            var note = new Notes({
                name: $scope.noteId
            });
            $http.get('/notes/note/shownote/'+ noteId).
                success(function(data, status, headers, config) {

                    console.log('data returned from server:' + data);
                    $scope.htmlcontent = data.content;
                    $http.get('/notes/populate/'+$scope.notebook_id).
                        success(function(data, status, headers, config) {
                            $scope.notes = data;
                        }).
                        error(function(data, status, headers, config) {
                            // called asynchronously if an error occurs
                            // or server returns response with an error status.
                        });

                }).
                error(function(data, status, headers, config) {
                    // called asynchronously if an error occurs
                    // or server returns response with an error status.
                    console.log('in error');
                });

        };

        //save note button
        $scope.saveNote = function () {
            //save post to server from here
            //alert( $scope.noteId);
            var note = new Notes({
                _id: $scope.noteId,
                content: $scope.htmlcontent
            });
            $http.put('/notes/note/update/',note).
                success(function(data, status, headers, config) {
                    $scope.notes = data;
                //alert('content: '+data);
                   // $scope.htmlcontent = data;
                }).
                error(function(data, status, headers, config) {
                    // called asynchronously if an error occurs
                    // or server returns response with an error status.
                });

        };


        $scope.deleteNote = function (noteId,notebookId) {
            $http.delete('/notes/note/deletenote/' + noteId);
            $scope.populateNotes(notebookId);
        };


        //populate all notebooks
        $scope.notefind = function () {
            $scope.notes = Notes.query();
        };

        //----------NOTEBOOK STUFF---------------//

        //populate all notebooks
        $scope.find = function () {
            $scope.notebooks = Notebooks.query();
        };

        //create new notebook
        $scope.newNotebook = function () {

            var notebook = new Notebooks({
                name: this.notebookTitle
            });
            notebook.$save(function (response) {
                $location.path('/');
                $scope.find();
                $scope.notebookTitle = '';
            }, function (errorResponse) {
                $scope.error = errorResponse.data.message;
            });

        };

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
        };

        //populate all notes from database
        $scope.populateNotes = function (notebookID) {

            //$scope.addNoteButton = notebook;

            $scope.notebook_id = notebookID;

            $http.get('/notes/populate/' + notebookID).
                success(function(data, status, headers, config) {
                    $scope.notes = data;
                }).
                error(function(data, status, headers, config) {
                    // called asynchronously if an error occurs
                    // or server returns response with an error status.
                });


        };
    }]);
