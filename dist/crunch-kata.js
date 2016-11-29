angular.module('crunch-kata', []);



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

/**
 * @class angular_module.crunch-kata.crunchVariableCatalog
 *
 * AngularJS directive that displays the variable catalog following its
 * hierarchical order.
 */
angular.module('crunch-kata').directive('crunchVariableCatalog', function () {
  return {
    template: '',
    controller: function (data) {
        var self = this;
        self.order = data.get('order');
    }
  };
});

//# sourceMappingURL=crunch-kata.js.map