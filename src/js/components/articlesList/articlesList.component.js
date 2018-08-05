
import '../../filters/ArticlesFilters.module';
import moment from 'moment';

_articlesListController.$inject = ['articlesHttpService', 'appToastService'];

let ArticlesListComponent = {
   template: require('./articlesList.tmpl.html'),
   controller: _articlesListController,
};

function _articlesListController(articlesHttpService, appToastService) {

   var $ctrl = this;
   $ctrl.items = [];
   $ctrl.text;
   function getPosts() {
      articlesHttpService.getArticles().then((data) => {
         $ctrl.items = data.data
      })
   };

   $ctrl.articleRemove = function(articleId){
    articlesHttpService.deleteArticle(articleId).then((data) => {
        //$ctrl.items = data.data
        appToastService.send(data.data.message);
        getPosts()
     },
    (err) => {
        appToastService.send(err);
    })
   }

   $ctrl.toggleEdit = function(articleId) {
      $ctrl.articleId = articleId
      console.log(articleId)
   };

   getPosts()
};

export default angular.module('ArticlesListModule', ['ArticlesFilters'])
   .component('articlesListComponent', ArticlesListComponent)