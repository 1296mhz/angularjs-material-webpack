
//_sidebarController.$inject = ['$rootScope'];

let ScreenContentComponent = {
   template: require('./screenContent.tmpl.html'),
   controller: _screenContentController
};

function _screenContentController() {
   console.log("Screen component contoller")
}

export default angular.module('ScreenContentModule', [])
   .component('screenContentComponent', ScreenContentComponent)