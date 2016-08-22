(function () {
    "use strict";
    angular.module("listLibraryManagerApp")
        .controller("removeColumnCtrl", removeColumnCtrl);
    removeColumnCtrl.$inject = ["listLibraryManagerSvc", "$stateParams", "$state", "$confirm", "toaster"];

    function removeColumnCtrl(listLibraryManagerSvc, $stateParams, $state, $confirm, toaster) {
        var vm = this;

        var listId = $stateParams.listId;
        vm.listName = $stateParams.listName;
        vm.contentTypes = [];

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

            });

        vm.removeColumn = function (field) {

            $confirm({
                text: String.format("{0} will be deleted permanently!", field.Title),
                title: "Are you sure?"
            })
                .then(function () {
                    listLibraryManagerSvc
                        .removeField(field)
                        .then(function (response) {
                            var index = vm.selectedContentType.allFields.indexOf(field);
                            vm.selectedContentType.allFields.splice(index, 1);
                            listLibraryManagerSvc.toast("success", String.format("{0} has been deleted successfully", field.Title));
                        }, function (errorResponse) {
                            listLibraryManagerSvc.toast("error", errorResponse.error.error.message);
                        });
                });
        };

    }
})();