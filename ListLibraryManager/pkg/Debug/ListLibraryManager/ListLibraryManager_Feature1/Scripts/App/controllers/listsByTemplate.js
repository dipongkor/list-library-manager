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


        listLibraryManagerSvc
            .getAllListsByTemplateId(vm.templateId)
            .then(function (response) {
            vm.allLists = response.d.results;
            vm.allListIsLoaded = true;
        }, function (error) {

            });
    }
    
})();