(function () {
    "use strict";
    angular.module("listLibraryManagerApp")
    .controller("multiChoiceCtrl", multiChoiceCtrl);

    multiChoiceCtrl.$inject = ["listLibraryManagerSvc", "fieldUtilitySvc", "$stateParams", "$state", "eventService"];

    function multiChoiceCtrl(listLibraryManagerSvc, fieldUtilitySvc, $stateParams, $state, eventService) {

        var vm = this;
        vm.listId = $stateParams.listId;
        vm.listName = $stateParams.listName;

        var fieldInfo = fieldUtilitySvc.getFieldByName("MultiChoice");

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
            var choices = vm.choicesAsText.split("\n");
            field.Choices = {
                __metadata: { type: 'Collection(Edm.String)' },
                results: choices
            };
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