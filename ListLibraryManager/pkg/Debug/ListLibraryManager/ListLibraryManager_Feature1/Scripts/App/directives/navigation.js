(function () {
    "use strict";
    angular.module("listLibraryManagerApp")
    .directive("navigation", navigation);

    function navigation() {
        var directive = {
            restrict: "EA",
            templateUrl: "../Templates/directives/navigation.html"
        }
        return directive;
    }
})();