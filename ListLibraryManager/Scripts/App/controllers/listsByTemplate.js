(function () {
    "use strict";
    angular.module("listLibraryManagerApp")
    .controller("listsByTemplateCtrl", listsByTemplateCtrl);

    listsByTemplateCtrl.$inject = ["listLibraryManagerSvc", "$stateParams"];

    function listsByTemplateCtrl(listLibraryManagerSvc, $stateParams) {
        var vm = this;
        vm.templateId = $stateParams.templateId;
        vm.templateName = $stateParams.templateName;
        vm.allListIsLoaded = false;

        vm.skip = 0;
        vm.top = 10;
        vm.pageStart = 1;
        vm.pageEnd = vm.skip + vm.top;


        listLibraryManagerSvc
            .getAllListsByTemplateId(vm.templateId, vm.skip, vm.top)
            .then(function (response) {
                vm.allLists = response.d.results;
                vm.pageEnd = vm.skip + vm.allLists.length;
                vm.allListIsLoaded = true;
            }, function (errorResponse) {
                listLibraryManagerSvc.toast("error", errorResponse.error.error.message);
            });

        vm.goToPreviousPage = function () {
            if ((vm.skip - vm.allLists.length) < 0) {
                return;
            }
            listLibraryManagerSvc
            .getAllListsByTemplateId(vm.templateId, vm.skip - vm.allLists.length, vm.top)
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
            .getAllListsByTemplateId(vm.templateId, vm.skip + vm.top, vm.top)
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