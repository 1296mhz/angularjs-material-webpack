

_profileController.$inject = [
   "appToastService",
   "configStorageService",
   '_',
   "uuid"
];

let ProfileComponent = {
   template: require('./profile.tmpl.html'),
   controller: _profileController
};

function _profileController(appToastService, configStorageService, _, uuid) {
   console.log("Profile component contoller")
   let $ctrl = this;

   $ctrl.operation = "Профиль";
   $ctrl.blockchainName = ['vox', 'steem', 'golos'];
   $ctrl.profile = {};
   $ctrl.profile = configStorageService.get("user");

   $ctrl.blockchainKeys = [];


   console.log()

   if(localStorage.getItem($ctrl.profile.user.id) !== null){
      $ctrl.blockchainKeys = JSON.parse(localStorage.getItem($ctrl.profile.user.id));
   } else {
      localStorage.setItem($ctrl.profile.user.id, JSON.stringify($ctrl.blockchainKeys))
   }

   

   $ctrl.saveBlockchain = function () {
      localStorage.setItem($ctrl.profile.user.id, JSON.stringify($ctrl.blockchainKeys))
      console.log(localStorage.getItem($ctrl.profile.user.id))
      appToastService.send("Сохранено в локальное хранилище.")
   };

   $ctrl.addKey = function () {
      console.log("Add key")
      console.log($ctrl.blockchainKeys)
      let newKey = {
         hash: uuid.v4(),
         username: "test",
         blockchainName: "vox",
         key: "test"
      };

      $ctrl.blockchainKeys.push(newKey)
   };

   $ctrl.removeBlockchain = function (uuid) {
      console.log(uuid)
      let res = _.reject($ctrl.blockchainKeys, (data) => {
         if(data.hash === uuid){
            return data
         }
      })
      $ctrl.blockchainKeys = res
      localStorage.setItem($ctrl.profile.user.id, JSON.stringify($ctrl.blockchainKeys))
   }
};

export default angular.module('ProfileModule', [])
   .component('profileComponent', ProfileComponent)