(function () {
    "use strict";
    angular.module("listLibraryManagerApp")
    .factory("listLibraryManagerSvc", listLibraryManagerSvc);

    listLibraryManagerSvc.$inject = ["spBaseService", "$q"];

    function listLibraryManagerSvc(spBaseService, $q) {
        return {
            getAllListsByTemplateId: getAllListsByTemplateId,
            getAllListTemplates: getAllListTemplates,
            getListById: getListById,
            updateList: updateList,
            removeList: removeList,
            clearAllItems: clearAllItems,
            getFieldsByContentType: getFieldsByContentType,
            removeField: removeField,
            addField: addField,
            getAllEditableFields: getAllEditableFields,
            getAllLists: getAllLists,
            addLookupField: addLookupField,
            addNewList: addNewList
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

        function clearAllItems(listName) {
            var deferred = $q.defer();
            var clientContext = new SP.ClientContext(spBaseService.baseUrl),
            list = clientContext.get_web().get_lists().getByTitle('SpNgList'),
            query = new SP.CamlQuery(),
            items = list.getItems(query);
            clientContext.load(items, "Include(Id)");
            clientContext.executeQueryAsync(function () {
                var enumerator = items.getEnumerator(),
                    simpleArray = [];
                while (enumerator.moveNext()) {
                    simpleArray.push(enumerator.get_current());
                }
                for (var s in simpleArray) {
                    simpleArray[s].deleteObject();
                }
                clientContext.executeQueryAsync(function () {
                    deferred.resolve("done");
                }, function () {
                    deferred.reject("error");
                });
            }, function () {
                deferred.reject("error");
            });

            return deferred.promise;
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

        function getFieldsByContentType(selectedContentType) {
            var query = selectedContentType.Fields.__deferred.uri;
            return spBaseService.getRequest(null, query);
        }

        function getAllEditableFields(listId) {
            var query = String.format("/_api/Web/Lists(guid'{0}')/Fields?$filter=CanBeDeleted eq true", listId);
            return spBaseService.getRequest(query);
        }

        function getAllLists() {
            var query = "/_api/Web/Lists?$select=Title,Id";
            return spBaseService.getRequest(query);
        }

        function removeField(field) {
            return spBaseService.deleteRequest(null, field.__metadata.uri);
        }

        function addField(fieldInfo, listId) {
            var url = String.format("/_api/Web/Lists(guid'{0}')/Fields", listId);
            return spBaseService.postRequest(fieldInfo, url);
        }

        function addLookupField(fieldInfo, listId) {
            var url = String.format("/_api/Web/Lists(guid'{0}')/Fields/addfield", listId);
            return spBaseService.postRequest(fieldInfo, url);
        }

        function addNewList(newList) {
            var url = "/_api/web/lists";
            return spBaseService.postRequest(newList, url);
        }
    }
})();