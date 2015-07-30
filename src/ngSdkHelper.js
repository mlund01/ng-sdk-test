angular.module('orderCloud.sdk')
    .factory('ObjectBuilder', ObjectBuilderFactory)
;

function ObjectBuilderFactory($q, Orders, LineItems, Users, Categories) {
    var service = {
        GetFullOrder: _getFullOrder,
        GetFullCatalog: _getFullCatalog,
        GetCategoryTree: _getCategoryTree,
        GetSubCategoryTree: _getSubCategoryTree,
        GetFullUser: _getFullUser
        //AddAllToOrder: _combineLineItems
    };

    function _getFullOrder(buyerID, orderID) {
        var dfd = $q.defer();
        Orders.Get(buyerID, orderID)
            .then(function (data) {
                addLineItems([buyerID, orderID, data])
                    .then(dfd.resolve(data))
            })
            .catch(dfd.reject(error));
        return dfd.promise;
    }

    function addLineItems(data) {
        var dfd = $q.defer();
        var buyerID = data[0];
        var orderID = data[1];
        var Orders = data[2];
        listLineItems(buyerID, orderID)
            .then(function(data) {
                Orders.LineItems = data;
                dfd.resolve(Orders);
            })
            .catch(dfd.reject(error));
        return dfd.promise;

    }

    function listLineItems(buyerID, orderID) {
        var dfd = $q.defer();
        var lineItems = LineItems.List(buyerID, orderID);
        for (var i = 0; i < lineItems.Items.length; i++) {
            LineItems.Get(buyerID, orderID, lineItems.Items[i].ID)
                .then(function(data) {
                    lineItems.Items[i].LineItem = data;
                    if (i == (lineItems.Items.length - 1)) {
                        dfd.resolve(lineItems);
                    }
                })
                .catch(dfd.reject(error));
        }

        return dfd.promise;

    }

    function _getFullUser	(buyerID, userID) {
        var dfd =$q.defer();
        Users(buyerID, userID)
            .then(function(data) {
                addAddresses(data, buyerID, userID)
                    .then(function(data) {
                        addAddresses()
                    })
            })

    }

    function _getFullCatalog (buyerID) {
        var dfd = $q.defer();
        _getCategoryTree(buyerID)
            .then(function(tree) {
                addProductsToTree(tree)
                    .then(dfd.resolve(data))
                    .catch(dfd.reject(reason))
            })
            .catch(dfd.reject(reason));
        return dfd.promise;
    }

    function addProductsToTree(tree) {

    }

    function _getCategoryTree (buyerID) {
        var dfd = $q.defer();
        var pageSize = 20;
        Categories(buyerID,"", 1, pageSize)
            .then(function(data) {
                var pages = data.Meta.TotalPages;
            })
            .catch(dfd.reject(reason));

        for (var i = 1; i <= pages; i++) {
            Categories(buyerID,"", i, pageSize)
                .then(function(data) {
                    addCategoryDetails(data.Items)
                        .then(function(data) {

                        })
                })
        }
    }

    function addCategoryDetails(tree) {}

    function _getSubCategoryTree () {

    }


    return service;
}