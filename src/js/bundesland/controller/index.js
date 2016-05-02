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