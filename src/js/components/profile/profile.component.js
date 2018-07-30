

_profileController.$inject = [
   "$localStorage",
   "configStorageService"
];

let ProfileComponent = {
   template: require('./profile.tmpl.html'),
   controller: _profileController
};

function _profileController($localStorage, configStorageService) {
   console.log("Profile component contoller")
   let $ctrl = this;

   $ctrl.operation = "Профиль";
   $ctrl.profile = {};
   $ctrl.profile = configStorageService.get("user");

   $ctrl.$storage = $localStorage;
   console.log("localstorage")
   $ctrl.$storage.ccc = $ctrl.profile.user.user
   console.log($ctrl.$storage.ccc);
   $ctrl.blockchainKeys = [];

   $ctrl.blockchainName = ['vox', 'steem', 'golos'];

   $ctrl.saveBlockchain = function () {
      console.log()
   };

   $ctrl.addKey = function () {
      console.log("Add key")
      let newKey = {
         username: "",
         blockchainName: "vox",
         key: ""
      };

      $ctrl.blockchainKeys.push(newKey)
   };
};

export default angular.module('ProfileModule', [])
   .component('profileComponent', ProfileComponent)