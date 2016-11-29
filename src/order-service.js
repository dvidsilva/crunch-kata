angular.module('crunch-kata').factory('order', function (data, helpers, $q) {
    var order = {};

    var getData = function getData() {
        var deferred = $q.defer();
        data.get('order').then(function (data) {
            order.data = data;
            order.list = helpers.flattenGraph(data.graph);
            if (order.data && order.variables) {
                deferred.resolve();
            }

        });

        data.get('variables').then(function (data) {
            order.variables = data.index;
            if (order.data && order.variables) {
                deferred.resolve();
            }

        });

        return deferred.promise;
    }

    order.get = function get(position) {
        return getData().then(function () {
            var keys = Object.keys(order.variables);
            if (keys[position] && order.variables[keys[position]]) {
                return order.variables[keys[position]];
            }

            return null;

        });

    }

    return order;
});
