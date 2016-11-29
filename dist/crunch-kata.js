angular.module('crunch-kata', []);

angular.module('crunch-kata').factory('name', function (data, helpers, $q) {
    var self = {};

    var getData = function getData() {
        var deferred = $q.defer();
        data.get('order').then(function (data) {
            self.data = data;
            self.list = helpers.flattenGraph(data.graph);
            if (name.data && name.variables) {
                deferred.resolve();
            }

        });

        data.get('variables').then(function (data) {
            self.variables = data.index;
            if (self.data && self.variables) {
                deferred.resolve();
            }

        });

        return deferred.promise;
    }

    self.get = function get(name) {
        return getData().then(function () {
            var keys = Object.keys(self.variables);
            for (var i = 0; i < keys.length; i++) {
                if (self.variables[keys[i]].name === name) {
                    return keys.indexOf(keys[i]);
                }
            }
            return null;
        });

    }

    return self;
});

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

angular.module('crunch-kata').factory('data', function ($http, $q, $log) {
    var data = {};
    data.location = '/fixtures/';

    var cache = {};

    data.get = function get(name) {
        if (!name) {
            return $q.reject('Name for fixture not provided');
        }

        if (cache[name]) {
            cache[name]._cached = true;
            return $q.when(cache[name]);
        }

        return $http.get(data.location + name + '.json').then(function (response) {
            cache[name] = response.data;
            return response.data;
        });
    }

    return data;
});

angular.module('crunch-kata').factory('helpers', function () {
    var helpers = {};

    helpers.flattenGraph = function flattenGraph(obj) {
        var Item = function (value) {
            this.value = value;
        };

        var stack = [];
        stack.push(new Item(obj));
        var result = [];

        while (stack.length > 0) {
            var item = stack.shift();
            for (var propName in item.value) {
                switch (Object.prototype.toString.call(item.value[propName])) {
                    case "[object Object]":
                        stack.push(new Item(item.value[propName]));
                        break;
                    case "[object Array]":
                        for (var i = 0; i < item.value[propName].length; i++) {
                            stack.push(new Item(item.value[propName][i]));
                            if (typeof item.value[propName][i] === 'string') {
                                result.push(item.value[propName][i]);
                            }

                        }
                        break;
                }
            }
        }
        return result;
    };

    return helpers;
});

/**
 * @class angular_module.crunch-kata.crunchVariableCatalog
 *
 * AngularJS directive that displays the variable catalog following its
 * hierarchical order.
 */
angular.module('crunch-kata').directive('crunchVariableCatalog', function () {
  return {
    template: '',
    controller: function (order, name) {
        var self = this;

        self.data = {};
        

        order.get(1).then(function (result) {
            console.log(result);
        });

        name.get('City').then(function (result) {
            console.log(result);
        });

        data.get('variables').then(function (data) {
            self.data = data;
        });

    }
  };
});

//# sourceMappingURL=crunch-kata.js.map