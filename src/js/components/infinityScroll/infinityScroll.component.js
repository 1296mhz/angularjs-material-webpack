
import angular from 'angular';
import '../../dep.module';

_infinityScrollController.$inject = ['$timeout'];

let InfinityScrollComponent = {
   template: require('./infinityScroll.tmpl.html'),
   controller: _infinityScrollController
};

function _infinityScrollController($timeout) {
   console.log("Infinity scroll component contoller")
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
}

export default angular.module('InfinityScrollModule', [])
   .component('infinityScrollComponent', InfinityScrollComponent)