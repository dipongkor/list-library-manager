(function () {
    "use strict";
    angular.module("listLibraryManagerApp")
    .controller("booleanCtrl", booleanCtrl);

    booleanCtrl.$inject = ["listLibraryManagerSvc", "fieldUtilitySvc", "$stateParams", "$state"];

    function booleanCtrl(listLibraryManagerSvc, fieldUtilitySvc, $stateParams, $state) {

        var vm = this;
        vm.listId = $stateParams.listId;
        vm.listName = $stateParams.listName;

        var fieldInfo = fieldUtilitySvc.getFieldByName("Boolean");

        vm.column = {
            __metadata: {
                type: fieldInfo.type
            },
            FieldTypeKind: fieldInfo.fieldTypeKind
        };


        vm.addColumn = function (field) {
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