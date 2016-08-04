(function () {
    "use strict";
    angular.module("listLibraryManagerApp")
    .controller("homeCtrl", homeCtrl);

    homeCtrl.$inject = ["listLibraryManagerSvc"];

    function homeCtrl(listLibraryManagerSvc) {
        var vm = this;
        vm.appName = "List/Library Manager";

        //listLibraryManagerSvc.getAllLists()
        //.then(function (response) {
        //    console.log(response);
        //    vm.allLists = response.d.results;
        //}, function (error) {

        //});
    }
})();