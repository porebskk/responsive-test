(function () {
    //Hauptmodul
    angular.module('stayfriends', [
        'bundesland'
    ]);
})();
(function () {
    angular.module('bundesland', [
        //controller
        'bundesland.controller.index',

        //service
        'bundesland.service.repository.bundesland',

        //directive
        'bundesland.directive.state',
        'bundesland.directive.person'
    ]);
})();
(function () {
    angular.module('bundesland.controller.index', ['bundesland.service.repository.bundesland'])
        .controller('BundeslandIndexController', ['bundesland.service.repository.bundesland', function (bundeslandRepo) {
            var ctrl = this;

            ctrl.bundesland = bundeslandRepo.query();

            this.getAvailableCharacters = function getAvailableCharacters() {
                var result = [];
                var personIndexCounts = ctrl.bundesland.personIndexCounts;
                for (var key in personIndexCounts) {
                    if (personIndexCounts.hasOwnProperty(key) && personIndexCounts[key] > 0) {
                        result.push(key);
                    }
                }
                return result;
            };
        }]);

})();
(function () {
    angular.module('bundesland.directive.person', [])
        .directive('person', function() {
            return {
                restrict: 'E',
                template:'{{character}}'
            };
        });
})();
(function () {
    angular.module('bundesland.directive.state', [])
        .directive('state', function() {
            return {
                restrict: 'E',
                template:'<div class=state-container-wrapper><div class=state-container-border><div class=state-container><div class=state-name>{{state.name}}</div><div class=school-count>{{state.schoolCount}} Schulen</div></div></div></div>'
            };
        });
})();
(function () {
    angular.module('bundesland.service.repository.bundesland', ['ngResource'])

        .factory('bundesland.service.repository.bundesland', ['$resource', function ($resource) {
            return $resource('bundesland.json', {}, {
                query: {method:'GET', cache: true}
            });
        }]);

})();