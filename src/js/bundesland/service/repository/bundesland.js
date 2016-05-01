(function () {
    angular.module('bundesland.service.repository.bundesland', ['ngResource'])

        .factory('bundesland.service.repository.bundesland', ['$resource', function ($resource) {
            return $resource('bundesland.json', {}, {
                query: {method:'GET', cache: true}
            });
        }]);

})();