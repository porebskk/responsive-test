(function () {
    angular.module('bundesland.directive.person', [])
        .directive('person', function() {
            return {
                restrict: 'E',
                templateUrl: 'person.html'
            };
        });
})();