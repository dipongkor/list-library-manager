(function () {
    "use strict";
    angular.module("listLibraryManagerApp")
    .controller("addColumnCtrl", addColumnCtrl);

    addColumnCtrl.$inject = ["listLibraryManagerSvc", "fieldUtilitySvc", "$stateParams", "$state", "eventService"];

    function addColumnCtrl(listLibraryManagerSvc, fieldUtilitySvc, $stateParams, $state, eventService) {
        var vm = this;
        vm.listName = $stateParams.listName;
        var listId = $stateParams.listId;

        vm.editableFields = [];

        listLibraryManagerSvc.getAllEditableFields(listId)
        .then(function (response) {
            vm.editableFields = response.d.results;
        }, function (error) {

        });

        vm.typeOnchange = function (type) {
            $state.go(type.sref);
        };

        vm.columnTypes = fieldUtilitySvc.fields;

        eventService.on("newColumnAdded", function (data,newColumn) {
            vm.editableFields.push(newColumn);
            vm.selectedType = null;
        });
    }
})();