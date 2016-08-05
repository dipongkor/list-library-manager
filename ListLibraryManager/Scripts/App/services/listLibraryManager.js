(function () {
    "use strict";
    angular.module("listLibraryManagerApp")
    .factory("listLibraryManagerSvc", listLibraryManagerSvc);

    listLibraryManagerSvc.$inject = ["spBaseService"];

    function listLibraryManagerSvc(spBaseService) {
        return {
            getAllListsByTemplateId: getAllListsByTemplateId,
            getAllListTemplates: getAllListTemplates,
            getListById: getListById,
            updateList: updateList,
            removeList: removeList
        };

        function getAllListsByTemplateId(templateId) {
            var query = "/_api/web/lists?$filter=BaseTemplate eq " + templateId;
            return spBaseService.getRequest(query);
        }

        function getAllListTemplates() {
            var query = "/_api/web/ListTemplates?$select=ImageUrl,Name,ListTemplateTypeKind&$filter=Hidden eq false";
            return spBaseService.getRequest(query);
        }

        function getListById(listId) {
            var query = String.format("/_api/Web/Lists(guid'{0}')?$expand=ContentTypes&$select=AllowContentTypes,BaseTemplate,ContentTypesEnabled,Description,EnableVersioning,Hidden,ImageUrl,ItemCount,Title,Id", listId);
            return spBaseService.getRequest(query);
        }

        function updateList(list) {
            var url = String.format("/_api/Web/Lists(guid'{0}')", list.Id);
            var data = {
                __metadata: { type: "SP.List" },
                AllowContentTypes: list.AllowContentTypes,
                ContentTypesEnabled: list.ContentTypesEnabled,
                Description: list.Description,
                EnableVersioning: list.EnableVersioning,
                Hidden: list.Hidden,
                Title: list.Title
            };
            return spBaseService.updateRequest(data, url);
        }

        function removeList(listId) {
            var url = String.format("/_api/Web/Lists(guid'{0}')", listId);
            return spBaseService.deleteRequest(url);
        }
    }
})();