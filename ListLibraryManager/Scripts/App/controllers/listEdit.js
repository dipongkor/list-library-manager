(function () {
    "use strict";
    angular.module("listLibraryManagerApp")
    .controller("listEditCtrl", listEditCtrl);

    listEditCtrl.$inject = ["listLibraryManagerSvc", "$stateParams", "$state"];

    function listEditCtrl(listLibraryManagerSvc, $stateParams, $state) {
        var vm = this;

        var listId = $stateParams.listId;
        vm.listName = $stateParams.listName;
        vm.params = $stateParams;

        listLibraryManagerSvc
            .getListById(listId)
        .then(function (response) {
            vm.selectedList = response.d;
        }, function (errorResponse) {
            listLibraryManagerSvc.toast("error", errorResponse.error.error.message);
        });

        vm.updateList = function (selectedList) {
            listLibraryManagerSvc
                .updateList(selectedList)
            .then(function (data) {
                $state.go("app.list", { listTemplate: $stateParams.listTemplate, listId: selectedList.Id, listName: selectedList.Title });
                listLibraryManagerSvc.toast("success", String.format("{0} has been updated successfully", selectedList.Title));
            }, function (error) {
                listLibraryManagerSvc.toast("error", errorResponse.error.error.message);
            });
        };
    }
})();