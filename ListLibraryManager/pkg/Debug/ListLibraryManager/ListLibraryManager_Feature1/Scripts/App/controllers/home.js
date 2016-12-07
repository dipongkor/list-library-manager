(function () {
    "use strict";
    angular.module("listLibraryManagerApp")
    .controller("homeCtrl", homeCtrl);

    homeCtrl.$inject = ["listLibraryManagerSvc", "templateUtilitySvc", "$state"];

    function homeCtrl(listLibraryManagerSvc, templateUtilitySvc, $state) {
        var vm = this;
        vm.appName = "List/Library Manager";

        vm.skip = 0;
        vm.top = 6;
        vm.pageStart = 1;
        vm.pageEnd = vm.skip + vm.top;

        listLibraryManagerSvc.getAllLists(vm.skip, vm.top)
        .then(function (response) {
            vm.allLists = response.d.results;
            vm.pageEnd = vm.skip + vm.allLists.length;
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

        vm.goToPreviousPage = function () {
            if ((vm.skip - vm.allLists.length) < 0) {
                return;
            }
            listLibraryManagerSvc
            .getAllLists(vm.skip - vm.allLists.length, vm.top)
            .then(function (response) {
                if (response.d.results.length) {
                    vm.skip -= vm.allLists.length;
                    vm.pageEnd -= vm.allLists.length;
                    vm.pageStart -= vm.top;
                    vm.allLists = response.d.results;
                    vm.allListIsLoaded = true;
                } else {
                    listLibraryManagerSvc.toast("info", "No more" + vm.templateName + " in this list.");
                }

            }, function (errorResponse) {
                listLibraryManagerSvc.toast("error", errorResponse.error.error.message);
            });
        };

        vm.goToNexPage = function () {
            listLibraryManagerSvc
            .getAllLists(vm.skip + vm.top, vm.top)
            .then(function (response) {
                if (response.d.results.length) {
                    vm.allLists = response.d.results;
                    vm.skip += vm.allLists.length;
                    vm.pageEnd += vm.allLists.length;
                    vm.pageStart += vm.top;
                    vm.allListIsLoaded = true;
                } else {
                    listLibraryManagerSvc.toast("info", "No more" + vm.templateName + " in this list.");
                }

            }, function (errorResponse) {
                listLibraryManagerSvc.toast("error", errorResponse.error.error.message);
            });
        };
    }
})();