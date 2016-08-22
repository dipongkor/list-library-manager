(function () {
    "use strict";
    angular.module("listLibraryManagerApp")
        .controller("listDetailsCtrl", listDetailsCtrl);

    listDetailsCtrl.$inject = ["listLibraryManagerSvc", "$stateParams", "$window", "$confirm", "cfpLoadingBar", "toaster"];

    function listDetailsCtrl(listLibraryManagerSvc, $stateParams, $window, $confirm, cfpLoadingBar, toaster) {
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
            $confirm({
                text: String.format("{0} will be deleted permanently", vm.listName),
                title: "Are you sure?"
            })
                .then(function () {
                    listLibraryManagerSvc
                        .removeList(listId)
                        .then(function (response) {
                            listLibraryManagerSvc.toast("success", String.format("{0} has been deleted successfully.", vm.listName));
                            $window.history.back();
                        }, function (error) {
                            listLibraryManagerSvc.toast("error", errorResponse.error.error.message);
                        });
                });
        };

        vm.clearData = function () {
            $confirm({
                text: "All items will be deleted!",
                title: "Are you sure?"
            })
                .then(function () {
                    cfpLoadingBar.start();
                    listLibraryManagerSvc
                        .clearAllItems(vm.listName)
                        .then(function (response) {
                            listLibraryManagerSvc.toast("success", "All items have been deleted successfylly.");
                            cfpLoadingBar.complete();
                        }, function (error) {
                            listLibraryManagerSvc.toast("error", error);
                            cfpLoadingBar.complete();
                        });
                });
        };
    }
})();