(function () {
    "use strict";
    angular.module("listLibraryManagerApp")
    .controller("noteCtrl", noteCtrl);

    noteCtrl.$inject = ["listLibraryManagerSvc", "fieldUtilitySvc", "$stateParams", "$state", "eventService"];

    function noteCtrl(listLibraryManagerSvc, fieldUtilitySvc, $stateParams, $state, eventService) {

        var vm = this;
        vm.listId = $stateParams.listId;
        vm.listName = $stateParams.listName;

        var fieldInfo = fieldUtilitySvc.getFieldByName("Note");

        vm.column = {
            __metadata: {
                type: fieldInfo.type
            },
            FieldTypeKind: fieldInfo.fieldTypeKind
        };


        vm.addColumn = function (field) {
            field.Indexed = field.EnforceUniqueValues;
            listLibraryManagerSvc
                .addField(field, vm.listId)
            .then(function (response) {
                listLibraryManagerSvc.toast("success", "New column has been added successfully.");
                eventService.trigger("newColumnAdded", response.d);
                $state.go("app.addColumn", $stateParams);
            }, function (error) {
                listLibraryManagerSvc.toast("error", errorResponse.error.error.message);
            });
        };
    }
})();