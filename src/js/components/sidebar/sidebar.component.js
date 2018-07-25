
_sidebarController.$inject = ['$rootScope', '$mdSidenav'];

let SidebarComponent = {
   template: require('./sidebar.tmpl.html'),
   controller: _sidebarController
};

function _sidebarController($rootScope, $mdSidenav) {
   console.log("Sidebar component contoller")

   this.links = [
      {
         "text": "Список всех статей",
         "uisref": "articlesList",
         "icon": "notes"
      }, {
         "text": "Хуета",
         "uisref": "infinityScroll",
         "icon": "account_box"
      }
   ];

   this.toggleSidenav =
      buildToggler('closeEventsDisabled');

   $rootScope.$on('click', () => {
      console.log("Fire")
      this.toggleSidenav()
   })

   function buildToggler(componentId) {
      return function () {
         $mdSidenav(componentId).toggle();
      };
   }
}

export default angular.module('SidebarModule', [])
   .component('sidebarComponent', SidebarComponent)