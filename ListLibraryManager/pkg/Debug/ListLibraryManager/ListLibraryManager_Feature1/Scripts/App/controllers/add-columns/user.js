﻿(function () {
    angular.module("listLibraryManagerApp")
   .controller("userCtrl", userCtrl);

    userCtrl.$inject = ["listLibraryManagerSvc", "fieldUtilitySvc", "$stateParams", "$state", "eventService"];

    function userCtrl(listLibraryManagerSvc, fieldUtilitySvc, $stateParams, $state, eventService) {

        var vm = this;
        vm.listId = $stateParams.listId;
        vm.listName = $stateParams.listName;

        var fieldInfo = fieldUtilitySvc.getFieldByName("User");

        vm.column = {
            __metadata: {
                type: fieldInfo.type
            },
            FieldTypeKind: fieldInfo.fieldTypeKind,
            Required: false,
            EnforceUniqueValues: false,
            AllowMultipleValues: false,
            SelectionMode: "0"
        };


        vm.addColumn = function (field) {
            field.Indexed = field.EnforceUniqueValues;
            listLibraryManagerSvc
                .addField(field, vm.listId)
            .then(function (response) {
                listLibraryManagerSvc.toast("success", "New column has been added successfully.");
                eventService.trigger("newColumnAdded", response.d);
                $state.go("app.addColumn", $stateParams);
            }, function (errorResponse) {
                listLibraryManagerSvc.toast("error", errorResponse.error.error.message);
            });
        };
    }
})();