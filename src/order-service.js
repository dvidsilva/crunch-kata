angular.module('crunch-kata').factory('order', function (data, helpers) {
    var order = {};

    data.get('order').then(function (data) {
        order.data = data;
        order.list = helpers.flattenGraph(data.graph);
        console.log(order.list);
    });

    order.get = function get(position) {
        return null;
    }

    return order;
});
