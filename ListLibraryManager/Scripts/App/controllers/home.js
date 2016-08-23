(function () {
    "use strict";
    angular.module("listLibraryManagerApp")
    .controller("homeCtrl", homeCtrl);

    homeCtrl.$inject = ["listLibraryManagerSvc", "templateUtilitySvc", "$state"];

    function homeCtrl(listLibraryManagerSvc, templateUtilitySvc, $state) {
        var vm = this;
        vm.appName = "List/Library Manager";

        listLibraryManagerSvc.getAllLists()
        .then(function (response) {
            vm.allLists = response.d.results;
        }, function (error) {

        });

        vm.goToList = function (list) {
            var listTemplate = templateUtilitySvc.getTemplateById(list.BaseTemplate);
            if (listTemplate) {
                $state.go("app.list", { listTemplate: listTemplate.Name, listId: list.Id, listName: list.Title });
            } else {
                listLibraryManagerSvc.toast("error", "You can not perform any action on this list");
            }
        };

        vm.findList = function (searchText) {
            if (!searchText)
                return;
            listLibraryManagerSvc.getAllLists(searchText)
            .then(function (response) {
                vm.allLists = response.d.results;
            }, function (errorResponse) {
                listLibraryManagerSvc.toast("error", errorResponse.error.error.message);
            });
        };
    }
})();