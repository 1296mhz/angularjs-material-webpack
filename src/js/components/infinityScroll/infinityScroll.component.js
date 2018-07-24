
import './infinityScroll.css';

_infinityScrollController.$inject = ['$timeout', 'postsHttpService'];

let InfinityScrollComponent = {
   template: require('./infinityScroll.tmpl.html'),
   controller: _infinityScrollController
};

function _infinityScrollController($timeout, postsHttpService) {
   console.log("Infinity scroll component contoller")
   const dynamicItems = [];

   postsHttpService.getPosts().then((data)=>{
      console.log(data.data)
   })

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
                  this.numLoaded_ = this.toLoad_;
                  
                  // $timeout(angular.noop, 300).then(angular.bind(this, function () {
                     // this.numLoaded_ = this.toLoad_;
                  // }));
               }
            }
         };
}

export default angular.module('InfinityScrollModule', [])
   .component('infinityScrollComponent', InfinityScrollComponent)