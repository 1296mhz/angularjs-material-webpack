
import '../../filters/ArticlesFilters.module';

_articleEditorController.$inject = ['articlesHttpService'];

let ArticleEditorComponent = {
   template: require('./articleEditor.tmpl.html'),
   controller: _articleEditorController
};

function _articleEditorController(articlesHttpService) {

   var $v = this;
   $v.id = [];
   function getPosts() {
      articlesHttpService.getArticle().then((data) => {
         // console.log(data.data)
         
         $v.items = data.data
      })
   }
}

export default angular.module('ArticleEditorModule', ['ArticlesFilters'])
   .component('articleEditorComponent', ArticleEditorComponent)