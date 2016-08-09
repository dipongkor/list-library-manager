(function () {
    "use strict";
    angular.module("listLibraryManagerApp")
    .controller("choiceCtrl", choiceCtrl);

    choiceCtrl.$inject = ["listLibraryManagerSvc", "fieldUtilitySvc", "$stateParams", "$state"];

    function choiceCtrl(listLibraryManagerSvc, fieldUtilitySvc, $stateParams, $state) {

        var vm = this;
        vm.listId = $stateParams.listId;
        vm.listName = $stateParams.listName;

        var fieldInfo = fieldUtilitySvc.getFieldByName("Choice");

        vm.column = {
            __metadata: {
                type: fieldInfo.type
            },
            FieldTypeKind: fieldInfo.fieldTypeKind
        };


        vm.addColumn = function (field) {
            field.Indexed = field.EnforceUniqueValues;
            field.EditFormat = field.EditFormat ? 0 : 1;
            field.Choices = {
                results: field.Choices.split("\n")
            };
            listLibraryManagerSvc
                .addField(field, vm.listId)
            .then(function (response) {
                $state.go("app.addColumn", $stateParams);
            }, function (error) {
                console.log(error);
            });
        };
    }
})();