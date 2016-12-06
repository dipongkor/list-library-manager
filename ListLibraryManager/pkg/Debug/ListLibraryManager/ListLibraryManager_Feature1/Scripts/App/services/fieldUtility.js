(function () {
    "use strict";
    angular.module("listLibraryManagerApp")
    .service("fieldUtilitySvc", fieldUtilitySvc);

    function fieldUtilitySvc() {
        this.fields = [
            {
                name: "Text",
                title: "Single line of text",
                sref: "app.addColumn.text",
                type: "SP.FieldText",
                fieldTypeKind: 2
            },
            {
                name: "Note",
                title: "Multiple lines of text",
                sref: "app.addColumn.note",
                type: "SP.FieldMultiLineText",
                fieldTypeKind: 3
            },
            {
                name: "Choice",
                title: "Choice (menu to choose from)",
                sref: "app.addColumn.choice",
                type: "SP.FieldChoice",
                fieldTypeKind: 6
            },
            {
                name: "MultiChoice",
                title: "Multi choice (menu to choose from)",
                sref: "app.addColumn.multichoice",
                type: "SP.FieldMultiChoice",
                fieldTypeKind: 15
            },
            {
                name: "Number",
                title: "Number (1, 1.0, 100)",
                sref: "app.addColumn.number",
                type: "SP.FieldNumber",
                fieldTypeKind: 9
            },
            {
                name: "DateTime",
                title: "Date and Time",
                sref: "app.addColumn.datetime",
                type: "SP.FieldDateTime",
                fieldTypeKind: 4
            },
            {
                name: "Lookup",
                title: "Lookup (information already on this site)",
                sref: "app.addColumn.lookup",
                type: "SP.FieldCreationInformation",
                fieldTypeKind: 7
            },
            {
                name: "Boolean",
                title: "Yes/No (check box)",
                sref: "app.addColumn.boolean",
                type: "SP.Field",
                fieldTypeKind: 8
            },
            {
                name: "User",
                title: "Person or Group",
                sref: "app.addColumn.user",
                type: "SP.FieldUser",
                fieldTypeKind: 20
            },
            {
                name: "URL",
                title: "Hyperlink or Picture",
                sref: "app.addColumn.hyperlink",
                type: "SP.FieldUrl",
                fieldTypeKind: 11
            }];

        this.getFieldByName = function (name) {
            var field = this.fields.find(function (field) {
                return field.name == name;
            });
            return field;
        };
    }
})();