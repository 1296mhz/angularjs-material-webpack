
_appToastService.$inject = [
   "$mdToast"
];

function _appToastService($mdToast) {
   return {
      send: (message) => {
         return $mdToast.show(
            $mdToast
               .simple()
               .textContent(message)
               .position("top right")
               .hideDelay(10000)
         );
      }
   }
}

export default angular.module('AppToastServiceModule', [])
   .factory('appToastService', _appToastService)