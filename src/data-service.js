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
