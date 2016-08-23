(function () {
    "use strict";
    angular.module("listLibraryManagerApp")
        .service("templateUtilitySvc", templateUtilitySvc);

    function templateUtilitySvc() {
        this.allTemplates = [{
            "Name": "Document Library",
            "ListTemplateTypeKind": 101
        }, {
            "Name": "Form Library",
            "ListTemplateTypeKind": 115
        }, {
            "Name": "Wiki Page Library",
            "ListTemplateTypeKind": 119
        }, {
            "Name": "Picture Library",
            "ListTemplateTypeKind": 109
        }, {
            "Name": "Links",
            "ListTemplateTypeKind": 103
        }, {
            "Name": "Announcements",
            "ListTemplateTypeKind": 104
        }, {
            "Name": "Contacts",
            "ListTemplateTypeKind": 105
        }, {
            "Name": "Calendar",
            "ListTemplateTypeKind": 106
        }, {
            "Name": "Promoted Links",
            "ListTemplateTypeKind": 170
        }, {
            "Name": "Discussion Board",
            "ListTemplateTypeKind": 108
        }, {
            "Name": "Tasks",
            "ListTemplateTypeKind": 171
        }, {
            "Name": "Issue Tracking",
            "ListTemplateTypeKind": 1100
        }, {
            "Name": "Custom List",
            "ListTemplateTypeKind": 100
        }, {
            "Name": "Custom List in Datasheet View",
            "ListTemplateTypeKind": 120
        }, {
            "Name": "External List",
            "ListTemplateTypeKind": 600
        }, {
            "Name": "Survey",
            "ListTemplateTypeKind": 102
        }, {
            "Name": "Asset Library",
            "ListTemplateTypeKind": 851
        }, {
            "Name": "Data Connection Library",
            "ListTemplateTypeKind": 130
        }, {
            "Name": "Report Library",
            "ListTemplateTypeKind": 433
        }, {
            "Name": "Access App",
            "ListTemplateTypeKind": 3100
        }];

        this.getTemplateById = function (templateId) {
            var template = this.allTemplates.find(function (template) {
                return template.ListTemplateTypeKind == templateId;
            });
            return template;
        };
    };
})();