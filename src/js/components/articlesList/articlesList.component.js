
import '../../dep.module';
import '../../filters/ArticlesFilters.module';

_articlesListController.$inject = ['articlesHttpService'];

let ArticlesListComponent = {
   template: require('./articlesList.tmpl.html'),
   controller: _articlesListController,
};

function _articlesListController(articlesHttpService) {

   var $ctrl = this;
   $ctrl.items = [];
   $ctrl.text;
   function getPosts() {
      articlesHttpService.getArticles().then((data) => {
         $ctrl.items = data.data
      })
   }

   this.toggleEdit = function(articleId) {
      $ctrl.articleId = articleId
      console.log(articleId)
   }

   getPosts()

}

export default angular.module('ArticlesListModule', ['ArticlesFilters'])
   .component('articlesListComponent', ArticlesListComponent)