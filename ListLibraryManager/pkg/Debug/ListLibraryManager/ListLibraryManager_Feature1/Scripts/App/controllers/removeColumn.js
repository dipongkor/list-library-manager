(function () {
    "use strict";
    angular.module("listLibraryManagerApp")
    .controller("removeColumnCtrl", removeColumnCtrl);
    removeColumnCtrl.$inject = ["listLibraryManagerSvc", "$stateParams", "$state"];
    function removeColumnCtrl(listLibraryManagerSvc, $stateParams, $state) {
        var vm = this;

        var listId = $stateParams.listId;
        vm.listName = $stateParams.listName;
        vm.contentTypes = [];

        listLibraryManagerSvc.getListById(listId)
        .then(function (response) {
            vm.selectedList = response.d;
            vm.selectedList.ContentTypes.results.forEach(function (ct) {
                if (!ct.Sealed && !ct.ReadOnly) {
                    vm.contentTypes.push(ct);
                }
            });
        }, function (error) {

        });

        vm.contentTypeOnchange = function (selectedContentType) {
            listLibraryManagerSvc
                .getFieldsByContentType(selectedContentType)
            .then(function (response) {
                console.log(response);
                vm.selectedContentType.allFields = response.d.results;
            }, function (error) {

            });
        };

        vm.removeColumn = function (field) {
            listLibraryManagerSvc
                .removeField(field)
            .then(function (response) {
                var index = vm.selectedContentType.allFields.indexOf(field);
                vm.selectedContentType.allFields.splice(index, 1);
            }, function (error) {

            });
        };
        
    }
})();