angular.module('crunch-kata', []).run(function (data, $log) {
    data.get('order');
    data.get('variables');
});
