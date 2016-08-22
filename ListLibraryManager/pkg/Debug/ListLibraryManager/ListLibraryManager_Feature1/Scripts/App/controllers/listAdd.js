(function () {
    "use strict";
    angular.module("listLibraryManagerApp")
        .controller("listAddCtrl", listAddCtrl);

    listAddCtrl.$inject = ["listLibraryManagerSvc", "$stateParams", "$state"];

    function listAddCtrl(listLibraryManagerSvc, $stateParams, $state) {
        var vm = this;
        vm.listTemplate = $stateParams.listTemplate;
        vm.templateId = $stateParams.templateId;


        vm.newList = {
            __metadata: {
                type: 'SP.List'
            },
            BaseTemplate: $stateParams.templateId
        };

        vm.addList = function (newList) {
            listLibraryManagerSvc
                .addNewList(newList)
                .then(function (response) {
                    listLibraryManagerSvc.toast("success", String.format("{0} has been added successfully", newList.Title));
                    $state.go("app.template", {
                        templateId: $stateParams.templateId,
                        templateName: $stateParams.listTemplate
                    });
                }, function (error) {
                    listLibraryManagerSvc.toast("error", errorResponse.error.error.message);
                });
        };
    }
})();