(function () {
    "use strict";
    angular.module("listLibraryManagerApp")
   .controller("dateTimeCtrl", dateTimeCtrl);

    dateTimeCtrl.$inject = ["listLibraryManagerSvc", "fieldUtilitySvc", "$stateParams", "$state"];

    function dateTimeCtrl(listLibraryManagerSvc, fieldUtilitySvc, $stateParams, $state) {

        var vm = this;
        vm.listId = $stateParams.listId;
        vm.listName = $stateParams.listName;

        var fieldInfo = fieldUtilitySvc.getFieldByName("DateTime");

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
                $state.go("app.addColumn", $stateParams);
            }, function (error) {
                console.log(error);
            });
        };
    }
})();