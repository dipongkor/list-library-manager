(function () {
    "use strict";
    angular.module("listLibraryManagerApp", [
        "spNgModule",
        "angular-loading-bar",
        "ngAnimate",
        "ui.router",
        "ui.bootstrap",
        "angular-confirm",
        "toaster",
        "ui"])
    .constant("IS_APP_WEB", false)
    .config(config);

    config.$inject = ["$stateProvider", "$urlRouterProvider", "cfpLoadingBarProvider"];

    function config($stateProvider, $urlRouterProvider, cfpLoadingBarProvider) {
        
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
        .state("app.about", {
            url: "/about",
            templateUrl: "../Templates/about.html"
        })
        .state("app.contact", {
            url: "/contact",
            templateUrl: "../Templates/contact.html"
        })
        .state("app.template", {
            url: "/template/{templateId}/{templateName}",
            templateUrl: "../Templates/allListsByTemplate.html",
            controller: "listsByTemplateCtrl",
            controllerAs: "vm"
        })
        .state("app.list", {
            url: "/list/details/{listTemplate}/{listId}/{listName}",
            templateUrl: "../Templates/list/list-details.html",
            controller: "listDetailsCtrl",
            controllerAs: "vm"
        })
        .state("app.listAdd", {
            url: "/list/add/{listTemplate}/{templateId}",
            templateUrl: "../Templates/list/list-add.html",
            controller: "listAddCtrl",
            controllerAs: "vm"
        })
        .state("app.listEdit", {
            url: "/list/edit/{listTemplate}/{listId}/{listName}",
            templateUrl: "../Templates/list/list-edit.html",
            controller: "listEditCtrl",
            controllerAs: "vm"
        })
        .state("app.removeColumn", {
            url: "/remove/column/{listTemplate}/{listId}/{listName}",
            templateUrl: "../Templates/list/remove-column.html",
            controller: "removeColumnCtrl",
            controllerAs: "vm"
        })
        .state("app.reorderColumn", {
            url: "/reorder/column/{listTemplate}/{listId}/{listName}",
            templateUrl: "../Templates/list/reorder-column.html",
            controller: "reorderColumnCtrl",
            controllerAs: "vm"
        })
        .state("app.addColumn", {
            url: "/add/column/{listTemplate}/{listId}/{listName}",
            templateUrl: "../Templates/list/add-column.html",
            controller: "addColumnCtrl",
            controllerAs: "vm"
        })
        .state("app.addColumn.text", {
            url: "/text",
            templateUrl: "../Templates/list/columns/text.html",
            controller: "textCtrl",
            controllerAs: "vm"
        })
        .state("app.addColumn.note", {
            url: "/note",
            templateUrl: "../Templates/list/columns/note.html",
            controller: "noteCtrl",
            controllerAs: "vm"
        })
        .state("app.addColumn.choice", {
            url: "/choice",
            templateUrl: "../Templates/list/columns/choice.html",
            controller: "choiceCtrl",
            controllerAs: "vm"
        })
        .state("app.addColumn.multichoice", {
            url: "/multichoice",
            templateUrl: "../Templates/list/columns/multi-choice.html",
            controller: "multiChoiceCtrl",
            controllerAs: "vm"
        })
        .state("app.addColumn.number", {
            url: "/number",
            templateUrl: "../Templates/list/columns/number.html",
            controller: "numberCtrl",
            controllerAs: "vm"
        })
        .state("app.addColumn.datetime", {
            url: "/datetime",
            templateUrl: "../Templates/list/columns/date-time.html",
            controller: "dateTimeCtrl",
            controllerAs: "vm"
        })
        .state("app.addColumn.boolean", {
            url: "/boolean",
            templateUrl: "../Templates/list/columns/boolean.html",
            controller: "booleanCtrl",
            controllerAs: "vm"
        })
        .state("app.addColumn.user", {
            url: "/user",
            templateUrl: "../Templates/list/columns/user.html",
            controller: "userCtrl",
            controllerAs: "vm"
        })
        .state("app.addColumn.hyperlink", {
            url: "/hyperlink",
            templateUrl: "../Templates/list/columns/hyperlink.html",
            controller: "hyperlinkCtrl",
            controllerAs: "vm"
        })
        .state("app.addColumn.lookup", {
            url: "/lookup",
            templateUrl: "../Templates/list/columns/lookup.html",
            controller: "lookupCtrl",
            controllerAs: "vm"
        });
    }
})();