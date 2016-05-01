(function () {
    angular.module('bundesland.directive.state', [])
        .directive('state', function() {
            return {
                restrict: 'E',
                templateUrl: 'state.html'
            };
        });
})();