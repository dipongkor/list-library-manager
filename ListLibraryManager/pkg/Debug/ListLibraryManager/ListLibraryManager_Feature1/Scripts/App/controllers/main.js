(function () {
    "use strict";
    angular.module("listLibraryManagerApp")
    .controller("mainCtrl", mainCtrl);

    mainCtrl.$inject = ["listLibraryManagerSvc"];

    function mainCtrl(listLibraryManagerSvc) {
        var vm = this;

        listLibraryManagerSvc
            .getAllListTemplates()
            .then(function (response) {
                vm.allListTemplate = response.d.results;
            }, function (errorResponse) {
                listLibraryManagerSvc.toast("error", errorResponse.error.error.message);
            });
    }
})();