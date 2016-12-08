(function () {
    "use strict";
    angular.module("listLibraryManagerApp")
    .controller("mainCtrl", mainCtrl);

    mainCtrl.$inject = ["listLibraryManagerSvc", "$scope", "$state"];

    function mainCtrl(listLibraryManagerSvc, $scope, $state) {
        $scope.selectedTemplate = undefined;

        listLibraryManagerSvc
            .getAllListTemplates()
            .then(function (response) {
                $scope.allListTemplate = response.d.results;
            }, function (errorResponse) {
                listLibraryManagerSvc.toast("error", errorResponse.error.error.message);
            });

        $scope.ngModelOptionsSelected = function ($item, $model, $label, $event) {
            $state.go("app.template", { templateId: $item.ListTemplateTypeKind, templateName: $item.Name });
            $scope.selectedTemplate = undefined;
        };
    }
})();