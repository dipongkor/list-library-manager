(function () {
    "use strict";
    angular.module("listLibraryManagerApp")
    .controller("multiChoiceCtrl", multiChoiceCtrl);

    multiChoiceCtrl.$inject = ["listLibraryManagerSvc", "fieldUtilitySvc", "$stateParams", "$state"];

    function multiChoiceCtrl(listLibraryManagerSvc, fieldUtilitySvc, $stateParams, $state) {

        var vm = this;
        vm.listId = $stateParams.listId;
        vm.listName = $stateParams.listName;

        var fieldInfo = fieldUtilitySvc.getFieldByName("MultiChoice");

        vm.column = {
            __metadata: {
                type: fieldInfo.type
            },
            FieldTypeKind: fieldInfo.fieldTypeKind
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
                $state.go("app.addColumn", $stateParams);
            }, function (error) {
                console.log(error);
            });
        };
    }
})();