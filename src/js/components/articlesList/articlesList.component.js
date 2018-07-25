
import '../../dep.module';
import '../../filters/ArticlesFilters.module';

_articlesListController.$inject = ['articlesHttpService'];

let ArticlesListComponent = {
   template: require('./articlesList.tmpl.html'),
   controller: _articlesListController,
   bindings: {
      articleId: '<'
    }
};

function _articlesListController(articlesHttpService) {

   var $v = this;
   $v.items = [];
   $v.articleId;
   function getPosts() {
      articlesHttpService.getArticles().then((data) => {
         // console.log(data.data)
         
         $v.items = data.data
      })
   }

   this.toggleEdit = function(articleId) {
      $v.articleId = articleId
      console.log(articleId)
   }


   getPosts()

}

export default angular.module('ArticlesListModule', ['ArticlesFilters'])
   .component('articlesListComponent', ArticlesListComponent)