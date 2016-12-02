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
