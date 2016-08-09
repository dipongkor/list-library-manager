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

        var schemaXml = "<Field \
                                Type=\"MultiChoice\" \
                                FillInChoice=\"{0}\" \>\
                                <Default>{1}</Default>\
                                <CHOICES>{2}\
                                </CHOICES>\
                    </Field>";

        vm.addColumn = function (field) {
            //field.Indexed = field.EnforceUniqueValues;
            //field.Choices = {
            //    results: field.Choices.split("\n")
            //};

            var choices = field.Choices.split("\n");

            choices.forEach(function (choice) {
                choice = String.format("<CHOICE>{0}</CHOICE>", choice);
            });



            var data = {
                __metadata: {
                    type: fieldInfo.type
                },
                FieldTypeKind: fieldInfo.fieldTypeKind,
               // EnforceUniqueValues: field.EnforceUniqueValues,
                //Indexed: field.EnforceUniqueValues,
                SchemaXml: String.format(schemaXml, field.FillInChoice.toString().toUpperCase(), field.DefaultValue, choices.join("")),
                Title: field.Title,
                //Description: field.Description,
                //Required: field.Required
            };

            listLibraryManagerSvc
                .addField(data, vm.listId)
            .then(function (response) {
                $state.go("app.addColumn", $stateParams);
            }, function (error) {
                console.log(error);
            });
        };
    }
})();