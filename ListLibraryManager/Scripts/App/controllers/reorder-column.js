(function () {
    "use strict";
    angular.module("listLibraryManagerApp")
    .controller("reorderColumnCtrl", reorderColumnCtrl);

    reorderColumnCtrl.$inject = ["listLibraryManagerSvc", "$stateParams", "toaster", "cfpLoadingBar"];

    function reorderColumnCtrl(listLibraryManagerSvc, $stateParams, toaster, cfpLoadingBar) {
        var vm = this;

        var listId = $stateParams.listId;
        vm.listName = $stateParams.listName;
        vm.contentTypes = [];
        vm.params = $stateParams;

        vm.contentTypeOnchange = function (selectedContentType) {
            listLibraryManagerSvc
                .getFieldsByContentType(selectedContentType)
                .then(function (response) {
                    console.log(response);
                    vm.selectedContentType.allFields = response.d.results;
                }, function (error) {

                });
        };

        listLibraryManagerSvc.getListById(listId)
            .then(function (response) {
                vm.selectedList = response.d;
                vm.selectedList.ContentTypes.results.forEach(function (ct) {
                    if (!ct.Sealed && !ct.ReadOnly) {
                        vm.contentTypes.push(ct);
                    }
                });
                vm.selectedContentType = vm.contentTypes[0];
                vm.contentTypeOnchange(vm.contentTypes[0]);
            }, function (error) {
                listLibraryManagerSvc.toast("error", errorResponse.error.error.message);
            });

        vm.applyOrder = function (selectedContentType) {
            cfpLoadingBar.start();
            listLibraryManagerSvc.reorderColumn(selectedContentType, vm.listName)
            .then(function (response) {
                listLibraryManagerSvc.toast("success", response);
                cfpLoadingBar.complete();
            }, function (error) {
                listLibraryManagerSvc.toast("error", error);
                cfpLoadingBar.complete();
            });
        };
    }
})();