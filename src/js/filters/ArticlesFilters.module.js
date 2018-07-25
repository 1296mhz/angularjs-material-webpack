import angular from 'angular';

function cropString(){
   return function (str) {
      let ourString = str.substr(0, 99);
      return ourString + "..."
   };
}

export default angular.module('ArticlesFilters', [])
   .filter('cropString', cropString);