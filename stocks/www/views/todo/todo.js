angular.module('App')

.config(function($stateProvider) {
  // Declare the state for the quotes, with the template and controller
  $stateProvider
    .state('tabs.todo', {
      url: '/todo',
      views: {
        quotes: {
          controller: 'TodoController',
          templateUrl: 'views/todo/todo.html'
        }
      }
    });
})

.controller('TodoController', function($scope,DataService,$ionicModal) {
    $scope.tasks=[];

    $scope.addTask=function addTask(task){
        DataService.addTask("Testing Task");
    }

    $scope.getTasks=function getTasks(){
        $scope.tasks=DataService.getTasks();
    }


    // Create an Ionic modal instance for adding a new stock
    $ionicModal.fromTemplateUrl('views/todo/add-task-modal.html', {
        scope: $scope
        }).then(function(modal) {
        $scope.modal = modal;
    });
    // Open the modal
    $scope.openModal = function() {
        $scope.modal.show();
    };
    // Close the modal and reset the model
    $scope.closeModal = function() {
        $scope.item = {};
        $scope.modal.hide();
    };
    // Ensure the modal is completely destroyed after the scope is destroyed
    $scope.$on('$destroy', function() {
        $scope.modal.remove();
    });
  

  
});