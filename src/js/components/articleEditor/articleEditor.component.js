
import '../../filters/ArticlesFilters.module';

_articleEditorController.$inject = ['articlesHttpService'];

let ArticleEditorComponent = {
   template: require('./articleEditor.tmpl.html'),
   controller: _articleEditorController,
   bindings: {
      article: '<'
   }
};

function _articleEditorController(articlesHttpService, article) {

   var $v = this;
   //  $v.id = [];
   console.log($v)
   console.log(article.data)


}

export default angular.module('ArticleEditorModule', ['ArticlesFilters'])
   .component('articleEditorComponent', ArticleEditorComponent)