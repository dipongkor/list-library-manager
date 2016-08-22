(function () {
    "use strict";
    angular.module("listLibraryManagerApp")
    .controller("listEditCtrl", listEditCtrl);

    listEditCtrl.$inject = ["listLibraryManagerSvc", "$stateParams", "$state"];

    function listEditCtrl(listLibraryManagerSvc, $stateParams, $state) {
        var vm = this;

        var listId = $stateParams.listId;
        vm.listName = $stateParams.listName;

        listLibraryManagerSvc
            .getListById(listId)
        .then(function (response) {
            console.log(response);
            vm.selectedList = response.d;
        }, function (error) {

        });

        vm.updateList = function (selectedList) {
            listLibraryManagerSvc
                .updateList(selectedList)
            .then(function (data) {
                $state.go("app.list", { listId: selectedList.Id, listName: selectedList.Title });
                listLibraryManagerSvc.toast("success", String.format("{0} has been updated successfully", selectedList.Title));
            }, function (error) {
                listLibraryManagerSvc.toast("error", errorResponse.error.error.message);
            });
        };
    }
})();