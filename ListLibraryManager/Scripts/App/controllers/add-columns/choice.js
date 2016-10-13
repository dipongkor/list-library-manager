(function () {
    "use strict";
    angular.module("listLibraryManagerApp")
    .controller("choiceCtrl", choiceCtrl);

    choiceCtrl.$inject = ["listLibraryManagerSvc", "fieldUtilitySvc", "$stateParams", "$state", "eventService"];

    function choiceCtrl(listLibraryManagerSvc, fieldUtilitySvc, $stateParams, $state, eventService) {

        var vm = this;
        vm.listId = $stateParams.listId;
        vm.listName = $stateParams.listName;

        var fieldInfo = fieldUtilitySvc.getFieldByName("Choice");

        vm.column = {
            __metadata: {
                type: fieldInfo.type
            },
            FieldTypeKind: fieldInfo.fieldTypeKind,
            Required: false,
            EnforceUniqueValues: false,
            EditFormat: false,
            FillInChoice: false
        };


        vm.addColumn = function (field) {
            try {
                field.Indexed = field.EnforceUniqueValues;
                field.EditFormat = field.EditFormat ? 0 : 1;
                field.Choices = {
                    results: vm.ChoicesAsString.split("\n")
                };
                listLibraryManagerSvc
                    .addField(field, vm.listId)
                    .then(function(response) {
                        listLibraryManagerSvc.toast("success", "New column has been added successfully.");
                        eventService.trigger("newColumnAdded", response.d);
                        $state.go("app.addColumn", $stateParams);
                    }, function (errorResponse) {
                        listLibraryManagerSvc.toast("error", errorResponse.error.error.message);
                    });
            } catch (ex) {
                alert(ex.toString());
            }
        };
    }
})();