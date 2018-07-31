
_sidebarController.$inject = [
   '$rootScope', 
   '$mdSidenav',
   'configStorageService'
];

let SidebarComponent = {
   template: require('./sidebar.tmpl.html'),
   controller: _sidebarController
};

function _sidebarController($rootScope, $mdSidenav, configStorageService) {
   console.log("Sidebar component contoller")
   let $ctrl = this;
   $ctrl.config = {};
   
   $ctrl.links = [
      {
         "text": "Профиль",
         "uisref": "profile",
         "icon": "account_box"
      },
      {
         "text": "Список всех статей",
         "uisref": "articlesList",
         "icon": "list"
      }, {
         "text": "Редактор",
         "uisref": "articleNewArticleEditor",
         "icon": "create"
      }
   ];

   $ctrl.toggleSidenav =
      buildToggler('closeEventsDisabled');

   $rootScope.$on('click', () => {
      this.toggleSidenav()
   })

   function buildToggler(componentId) {
      return function () {
         $mdSidenav(componentId).toggle();
      };
   }

   $ctrl.config = configStorageService.get();

}

export default angular.module('SidebarModule', [])
   .component('sidebarComponent', SidebarComponent)