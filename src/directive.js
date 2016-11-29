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
