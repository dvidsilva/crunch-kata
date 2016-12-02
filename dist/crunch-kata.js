angular.module('crunch-kata', []).run(function (data, $log) {
    data.get('order');
    data.get('variables');
});

angular.module('crunch-kata').factory('crunchName', function (data, helpers, $q) {
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

angular.module('crunch-kata').factory('crunchOrder', function (data, helpers, $q) {
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

    helpers.fixData = function fixData (order, data) {
        var Item = function (value) {
            this.value = value;
        };

        var stack = [];
        stack.push(new Item(data.index));
        if (order) {
            return Object.keys(data.index);
        }

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
  var template = [
      '<div>',
      '     <p><strong ng-bind=vm.data.description></strong></p>',
      '     <ul>',
      '     <li ng-repeat="item in vm.fixedData">',
      '         <variable-display variable=item></variable-display>',
      '     </li>',
      '     </ul>',
      '</div>'
  ];
  return {
    template: template.join(''),
    controllerAs: 'vm',
    restrict: 'E',
    controller: function (crunchOrder, crunchName, data, helpers) {
        var self = this;

        self.data = {};
        
        crunchOrder.get(1).then(function (result) {
            console.log(result);
        });

        crunchName.get('City').then(function (result) {
            console.log(result);
        });

        data.get('variables').then(function (vars) {
            self.data = vars;
        }).then(function () {
            return data.get('order');
        }).then(function (order) {
            self.order = order;
        }).then(function () {
            self.fixedData = helpers.fixData(self.order, self.data);
        });
       

    }
  };
}).directive('variableDisplay', function () {
    var template = [
        '<p>',
        '<span ng-if="vm.hasChildren(variable)">{{variable}}</span>',
        '<ul ng-if="!vm.hasChildren(variable)">',
        '   <li ng-repeat="item in category.categories">',
        '       <variable-display variable=item></variable-display>',
        '   </li>',
        '</ul>',
        '</p>'
    ];
    return {
        template: template.join(''),
        controllerAs: 'vm',
        restrict: 'E',
        scope: {
            variable: '='
        },
        controller: function () {
            this.hasChildren = function (item) {
                console.log(item);
                return (typeof item === 'string');
            };
        }
    };
});

//# sourceMappingURL=crunch-kata.js.map