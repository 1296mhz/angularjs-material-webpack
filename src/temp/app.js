(function () {
   'use strict';
   
   angular
      .module('app', ['ngMaterial', 'ngAnimate', 'ngAria', 'ngMessages'])
      .controller('AppCtrl', function ($timeout) {
         this.infiniteItems = {
            numLoaded_: 0,
            toLoad_: 0,

            getItemAtIndex: function (index) {
               if (index > this.numLoaded_) {
                  this.fetchMoreItems_(index);
                  return null;
               }

               return index;
            },
            getLength: function () {
               return this.numLoaded_ + 5;
            },

            fetchMoreItems_: function (index) {

               if (this.toLoad_ < index) {
                  this.toLoad_ += 20;
                  $timeout(angular.noop, 300).then(angular.bind(this, function () {
                     this.numLoaded_ = this.toLoad_;
                  }));
               }
            }
         };
      })
      .controller('BasicDemoCtrl', function ($scope) {})
      .controller('SidenavCtrl', function ($scope, $mdSidenav) {
         $scope.toggleSidenav =
          buildToggler('closeEventsDisabled');

         function buildToggler(componentId) {
            return function () {
               $mdSidenav(componentId).toggle();
            };
         }
      })
})();