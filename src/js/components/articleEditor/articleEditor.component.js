
import '../../filters/ArticlesFilters.module';

_articleEditorController.$inject = ['articlesHttpService'];

let ArticleEditorComponent = {
   template: require('./articleEditor.tmpl.html'),
   controller: _articleEditorController,
   onEnter: function (article) {
      if (article) {
         console.log(article)
       }
   },
   onExit: function (article) {
      if (article) { }
   },
   bindings: {
      article: '<'
   }
};

function _articleEditorController(articlesHttpService) {

   let $ctrl = this;


   $ctrl.toggleButton = function () {
      console.log($ctrl.article.data[0] )
   }
}

export default angular.module('ArticleEditorModule', ['ArticlesFilters'])
   .component('articleEditorComponent', ArticleEditorComponent)