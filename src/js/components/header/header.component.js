
import angular from 'angular';
import '../../vendor.module';

_headerController.$inject = ['$rootScope'];

let HeaderComponent = {
    template: require('./header.tmpl.html'),
    controller: _headerController
};

function _headerController($rootScope) {
    this.toggleSidenav = function(s){
        console.log("cccc")
        $rootScope.$emit('click', { message: "Hello"})
    }  
}

export default angular.module('HeaderModule', [])
    .component('headerComponent', HeaderComponent)