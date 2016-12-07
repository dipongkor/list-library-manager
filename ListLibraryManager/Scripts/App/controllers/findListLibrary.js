(function () {
    "use strict";
    angular.module("listLibraryManagerApp")
    .controller("findListLibraryCtrl", findListLibraryCtrl);
    findListLibraryCtrl.$inject = ["$scope", "listLibraryManagerSvc", "templateUtilitySvc", "$state"];
    function findListLibraryCtrl($scope, listLibraryManagerSvc, templateUtilitySvc, $state) {
        $scope.findList = function (searchKey) {
            return listLibraryManagerSvc.getAllLists(0, 5, searchKey)
                .then(function (response) {
                    return response.d.results;
                }, function (errorResponse) {

                });
        }

        $scope.ngModelOptionsSelected = function ($item, $model, $label, $event) {
            var listTemplate = templateUtilitySvc.getTemplateById($item.BaseTemplate);
            if (listTemplate) {
                $state.go("app.list", { listTemplate: listTemplate.Name, listId: $item.Id, listName: $item.Title });
            } else {
                listLibraryManagerSvc.toast("error", "You can not perform any action on this list");
            }
        };
    }
})();