(function () {
    "use strict";
    angular.module("listLibraryManagerApp")
    .factory("listLibraryManagerSvc", listLibraryManagerSvc);

    listLibraryManagerSvc.$inject = ["spBaseService"];

    function listLibraryManagerSvc(spBaseService) {
        return {
            getAllListsByTemplateId: getAllListsByTemplateId,
            getAllListTemplates: getAllListTemplates,
            getListById: getListById
        };

        function getAllListsByTemplateId(templateId) {
            var query = "/_api/web/lists?$filter=BaseTemplate eq " + templateId;
            return spBaseService.getRequest(query);
        }

        function getAllListTemplates() {
            var query = "/_api/web/ListTemplates?$select=ImageUrl,Name,ListTemplateTypeKind&$filter=Name ne ''";
            return spBaseService.getRequest(query);
        }

        function getListById(listId) {
            var query = String.format("_api/Web/Lists(guid'{0}')?$select=AllowContentTypes,ContentTypesEnabled,Description,EnableVersioning,Hidden,ImageUrl,ItemCount,Title", listId);
            return spBaseService.getRequest(query);
        }
    }
})();