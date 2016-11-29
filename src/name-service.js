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
