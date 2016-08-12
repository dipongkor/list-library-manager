(function () {
    angular.module("listLibraryManagerApp")
   .controller("lookupCtrl", lookupCtrl);

    lookupCtrl.$inject = ["listLibraryManagerSvc", "fieldUtilitySvc", "$stateParams", "$state"];

    function lookupCtrl(listLibraryManagerSvc, fieldUtilitySvc, $stateParams, $state) {

        var vm = this;
        vm.listId = $stateParams.listId;
        vm.listName = $stateParams.listName;
        vm.lookupLists = [];

        var fieldInfo = fieldUtilitySvc.getFieldByName("Lookup");

        vm.column = {
            __metadata: {
                type: fieldInfo.type
            },
            FieldTypeKind: fieldInfo.fieldTypeKind
        };

        listLibraryManagerSvc
            .getAllLists()
        .then(function (response) {
            vm.lookupLists = response.d.results;
        }, function (error) {

        });


        vm.addColumn = function (field) {
            var data = {
                parameters: {
                    __metadata: { type: SP.FieldCreationInformation },
                    FieldTypeKind: fieldInfo.fieldTypeKind,
                    Title: field.Title,
                    LookupListId: vm.lookupList.Id,
                    LookupFieldName: field.LookupField,
                    Required: field.Required
                }
            };
            listLibraryManagerSvc
                .addLookupField(data, vm.listId)
            .then(function (response) {
                $state.go("app.addColumn", $stateParams);
            }, function (error) {
                console.log(error);
            });
        };
    }
})();

//https://msdn.microsoft.com/en-us/library/office/dn600182.aspx#bk_FieldLookup