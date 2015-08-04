angular.module( 'orderCloud' )

    .config( CatalogConfig )
    .controller( 'CatalogCtrl', CatalogController )

;

function CatalogConfig( $stateProvider ) {
    $stateProvider.state( 'catalog', {
        url: '/catalog',
        templateUrl:'catalog/templates/catalog.tpl.html',
        controller:'CatalogCtrl',
        controllerAs: 'catalog',
        data:{ pageTitle: 'Catalog' }
    });
}

function CatalogController(ObjectBuilder) {
    var vm = this;
    vm.currentView = "";
    vm.welcomeMessage = "Please select your test above...";
    vm.displayObject = {};

    vm.show = function(selection) {
        switch (selection) {
            case "getFullOrder":
                vm.getFullOrder();
                break;
            case "getFullUser":
                vm.getFullUser();
                break;
            case "getCatalogTree":
                vm.getCatalogTree();
                break;
            case "getMultLineItems":
                vm.getMultLineItems();
                break;
            default:
                vm.displayObject = {};
        }
    };

    vm.getFullOrder = function() {
        vm.displayObject = {
            status: "Not Built"
        }
    };

    vm.getFullUser = function() {
        vm.displayObject = {
            status: "Not Built"
        }
    };

    vm.getCatalogTree = function() {
        vm.displayObject = {
            status: "Not Built"
        }
    };
    vm.getMultLineItems = function() {
        vm.displayObject = {
            status: "Not Built"
        }
    };
}