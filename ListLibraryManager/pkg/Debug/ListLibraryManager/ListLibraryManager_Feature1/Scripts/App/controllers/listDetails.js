(function () {
    "use strict";
    angular.module("listLibraryManagerApp")
        .controller("listDetailsCtrl", listDetailsCtrl);

    listDetailsCtrl.$inject = ["listLibraryManagerSvc", "$stateParams", "$window", "$confirm", "cfpLoadingBar", "toaster", "$state"];

    function listDetailsCtrl(listLibraryManagerSvc, $stateParams, $window, $confirm, cfpLoadingBar, toaster, $state) {
        var vm = this;

        var listId = $stateParams.listId;
        vm.listName = $stateParams.listName;
        vm.listTemplate = $stateParams.listTemplate;

        listLibraryManagerSvc
            .getListById(listId)
            .then(function (response) {
                vm.selectedList = response.d;
            }, function (errorResponse) {
                listLibraryManagerSvc.toast("error", errorResponse.error.error.message);
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
                            $state.go("app.template", {templateId: vm.selectedList.BaseTemplate , templateName: vm.listTemplate});
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
                            vm.selectedList.ItemCount = 0;
                        }, function (error) {
                            listLibraryManagerSvc.toast("error", error);
                            cfpLoadingBar.complete();
                        });
                });
        };
    }
})();