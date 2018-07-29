
_headerController.$inject = ['$rootScope'];

let HeaderComponent = {
    template: require('./header.tmpl.html'),
    controller: _headerController
};

function _headerController($rootScope) {
    var $ctrl = this;

    $ctrl.logout = function(){
        window.location.assign("/logout")
    }
    $ctrl.toggleSidenav = function(s){
        $rootScope.$emit('click', { message: "Hello"});
    }  

}

export default angular.module('HeaderModule', [])
    .component('headerComponent', HeaderComponent)