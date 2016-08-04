(function () {
    "use strict";
    angular.module("listLibraryManagerApp", [
        "spNgModule",
        "angular-loading-bar",
        "ngAnimate",
        "ui.router"])
    .constant("IS_APP_WEB", false)
    .config(config);

    config.$inject = ["$stateProvider", "$urlRouterProvider"];

    function config($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/app/home');

        $stateProvider
        .state("app", {
            url: "/app",
            templateUrl: "../Templates/main.html",
            controller: "mainCtrl",
            controllerAs: "vm"
        })
        .state("app.home", {
            url: "/home",
            templateUrl: "../Templates/home.html",
            controller: "homeCtrl",
            controllerAs: "vm"
        })
        .state("app.template", {
            url: "/template/{templateId}/{templateName}",
            templateUrl: "../Templates/allListsByTemplate.html",
            controller: "listsByTemplateCtrl",
            controllerAs: "vm"
        })
        .state("app.list", {
            url: "/list/{listId}/{listName}",
            templateUrl: "../Templates/list/list-details.html",
            controller: "listDetailsCtrl",
            controllerAs: "vm"
        });
    }
})();