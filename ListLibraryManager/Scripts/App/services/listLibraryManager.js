(function () {
    "use strict";
    angular.module("listLibraryManagerApp")
    .factory("listLibraryManagerSvc", listLibraryManagerSvc);

    listLibraryManagerSvc.$inject = ["spBaseService", "$q", "toaster"];

    function listLibraryManagerSvc(spBaseService, $q, toaster) {
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
            addNewList: addNewList,
            toast: toast,
            reorderColumn: reorderColumn,
            getListsForLookupColumns: getListsForLookupColumns
        };

        function getAllListsByTemplateId(templateId, skip, top) {
            var query = "/_api/web/lists?$filter=BaseTemplate eq " + templateId + "&$orderby=Title asc" + "&$skip=" + skip + "&$top=" + top;
            return spBaseService.getRequest(query);
        }

        function getAllListTemplates() {
            var query = "/_api/web/ListTemplates?$select=ImageUrl,Name,ListTemplateTypeKind,Description&$filter=Hidden eq false&$orderby=Name asc";
            return spBaseService.getRequest(query);
        }

        function getListById(listId) {
            var query = String.format("/_api/Web/Lists(guid'{0}')?$expand=ContentTypes&$select=AllowContentTypes,BaseTemplate,ContentTypesEnabled,Description,EnableVersioning,Hidden,ImageUrl,ItemCount,Title,Id", listId);
            return spBaseService.getRequest(query);
        }

        function clearAllItems(listName) {
            
            return new Promise(function (resolve, reject) {
                var clientContext = new SP.ClientContext(spBaseService.baseUrl),
                    list = clientContext.get_web().get_lists().getByTitle(listName),
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
                                resolve("done");
                            }, function (sender, args) {
                                reject(args.get_message());
                            });
                        }, function (sender, args) {
                            reject(args.get_message());
                        });
            });
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
            var query = selectedContentType.Fields.__deferred.uri + "?$filter=ReadOnlyField eq false and TypeDisplayName ne 'Computed'";
            return spBaseService.getRequest(null, query);
        }

        function getAllEditableFields(listId) {
            var query = String.format("/_api/Web/Lists(guid'{0}')/Fields?$filter=CanBeDeleted eq true", listId);
            return spBaseService.getRequest(query);
        }

        function getAllLists(skip, top, searchKey) {
            var query = "/_api/Web/Lists?$select=Title,Description,ItemCount,BaseTemplate,Id&$top=" + top + "&$skip=" + skip;
            if (searchKey) {
                query += String.format("&$filter=substringof('{0}',Title)", searchKey);
            }
            return spBaseService.getRequest(query);
        }

        function getListsForLookupColumns() {
            var query = "/_api/web/lists?$filter=Hidden eq false&$select=Title,Description,ItemCount,BaseTemplate,Id";
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

        function toast(type, message) {
            toaster.pop({
                type: type,
                title: "List/Library Manager says",
                body: message
            });
        }

        function reorderColumn(selectedContentType, listTitle) {
            return new Promise(function (resolve,reject) {
                var listContentTypes;

                var ctx = new SP.ClientContext(spBaseService.baseUrl);
                var list = ctx.get_web().get_lists().getByTitle(listTitle);

                listContentTypes = list.get_contentTypes();

                ctx.load(listContentTypes);

                ctx.executeQueryAsync(function () {
                    var itemContenType = listContentTypes.getById(selectedContentType.Id.StringValue);
                    var itemContenTypeFieldLink = itemContenType.get_fieldLinks();
                    var reorderedFields = [];
                    selectedContentType.allFields.forEach(function (field) {
                        reorderedFields.push(field.InternalName);
                    });
                    itemContenTypeFieldLink.reorder(reorderedFields);
                    itemContenType.update(false);
                    ctx.executeQueryAsync(function () {
                        resolve("New order applied successfully.");
                    }, function (sender, args) {
                        reject(args.get_message());
                    });
                   
                }, function (sender, args) {
                    reject(args.get_message());
                });
            });
        }
    }
})();