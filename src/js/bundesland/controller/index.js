(function () {
    angular.module('bundesland.controller.index', ['bundesland.service.repository.bundesland'])
        .controller('BundeslandIndexController', ['bundesland.service.repository.bundesland', function (bundeslandRepo) {
            var ctrl = this;

            ctrl.repo = bundeslandRepo.query();
        }]);

})();