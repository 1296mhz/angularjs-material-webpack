
import '../../dep.module';
import '../../filters/PostsFilters.module';

_articlesListController.$inject = ['postsHttpService'];

let ArticlesListComponent = {
   template: require('./articlesList.tmpl.html'),
   controller: _articlesListController
};

function _articlesListController(postsHttpService) {

   var $v = this;
   $v.items = [];
   function getPosts() {
      postsHttpService.getPosts().then((data) => {
         // console.log(data.data)
         
         $v.items = data.data
      })
   }

   getPosts()

}

export default angular.module('ArticlesListModule', ['PostsFilters'])
   .component('articlesListComponent', ArticlesListComponent)