

_profileController.$inject = [
   "appToastService",
   "configStorageService"
];

let ProfileComponent = {
   template: require('./profile.tmpl.html'),
   controller: _profileController
};

function _profileController(appToastService, configStorageService) {
   console.log("Profile component contoller")
   let $ctrl = this;

   $ctrl.operation = "Профиль";
   $ctrl.blockchainName = ['vox', 'steem', 'golos'];
   $ctrl.profile = {};
   $ctrl.profile = configStorageService.get("user");

   $ctrl.blockchainKeys = [];

   $ctrl.blockchainKeys = JSON.parse(localStorage.getItem($ctrl.profile.user.id));

   $ctrl.saveBlockchain = function () {
      localStorage.setItem($ctrl.profile.user.id, JSON.stringify($ctrl.blockchainKeys))
      console.log(localStorage.getItem($ctrl.profile.user.id))
      appToastService.send("Сохранено в локальное хранилище.")
   };

   $ctrl.addKey = function () {
      console.log("Add key")
      let newKey = {
         username: "test",
         blockchainName: "vox",
         key: "test"
      };

      $ctrl.blockchainKeys.push(newKey)
   };

};

export default angular.module('ProfileModule', [])
   .component('profileComponent', ProfileComponent)