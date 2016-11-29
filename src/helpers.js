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
