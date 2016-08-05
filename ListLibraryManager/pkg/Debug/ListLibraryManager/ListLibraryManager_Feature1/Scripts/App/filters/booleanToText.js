(function () {
    "use strict";
    angular.module("listLibraryManagerApp")
    .filter("booleanToText", booleanToText);

    function booleanToText() {
        var filter = function (input) {
            return input === true ? "Yes" : "No";
        };
        return filter;
    }
})();