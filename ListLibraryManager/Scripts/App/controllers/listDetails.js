(function () {
    "use strict";
    angular.module("listLibraryManagerApp")
    .controller("listDetailsCtrl", listDetailsCtrl);

    listDetailsCtrl.$inject = ["listLibraryManagerSvc", "$stateParams", "$window"];

    function listDetailsCtrl(listLibraryManagerSvc, $stateParams, $window) {
        var vm = this;

        var listId = $stateParams.listId;
        vm.listName = $stateParams.listName;
        vm.listTemplate = $stateParams.listTemplate;

        listLibraryManagerSvc
            .getListById(listId)
        .then(function (response) {
            console.log(response);
            vm.selectedList = response.d;
        }, function (error) {

        });

        vm.removeList = function (listId) {
            listLibraryManagerSvc
            .removeList(listId)
            .then(function (response) {
                $window.history.back();
            }, function (error) {

            });
        };

        vm.clearData = function () {
            listLibraryManagerSvc
                .clearAllItems(vm.listName)
            .then(function (response) {
                console.log(response);
            }, function (error) {
                console.log(error);
            });
        };
    }
})();