
import angular from 'angular';
import '../../vendor.module';

//_homeController.$inject = ['$timeout'];

let HomeComponent = {
   template: require('./home.tmpl.html'),
   controller: _homeController
};

function _homeController() {
   console.log("Home component contoller")
}

export default angular.module('HomeModule', [])
   .component('homeComponent', HomeComponent)