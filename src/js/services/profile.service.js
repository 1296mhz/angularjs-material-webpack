_profileHttpService.$inject = ["$http", "apiServerHost"];

function _profileHttpService($http, apiServerHost) {

  return {
    getProfile: () => {
      return $http.get("http://" + apiServerHost + "/api/v1/profile",{ cache: true});
    }
  };
}

export default angular
  .module("ProfileHttpService", [])
  .factory("profileHttpService", _profileHttpService);
