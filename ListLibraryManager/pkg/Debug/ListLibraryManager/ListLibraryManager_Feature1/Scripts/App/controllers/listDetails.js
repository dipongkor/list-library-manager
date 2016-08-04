(function () {
    "use strict";
    angular.module("listLibraryManagerApp")
    .controller("listDetailsCtrl", listDetailsCtrl);

    listDetailsCtrl.$inject = ["listLibraryManagerSvc", "$stateParams"];

    function listDetailsCtrl(listLibraryManagerSvc, $stateParams) {
        var vm = this;

        var listId = $stateParams.listId;
        vm.listName = $stateParams.listName;

        listLibraryManagerSvc
            .getListById(listId)
        .then(function (response) {
            console.log(response);
        }, function (error) {

        });
    }
})();