(function () {
    angular.module('bundesland', [
        //controller
        'bundesland.controller.index',

        //service
        'bundesland.service.repository.bundesland',

        //directive
        'bundesland.directive.state'
    ]);
})();