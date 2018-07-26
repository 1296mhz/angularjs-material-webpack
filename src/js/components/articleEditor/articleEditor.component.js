
import '../../filters/ArticlesFilters.module';
import '../../vendor/smde/simplemde-markdown-editor/dist/simplemde.min.css';
import '../../vendor/smde/simplemde-angular/dist/simplemde-angular';

_articleEditorController.$inject = ['articlesHttpService'];
_simpleMDE.$inject = ['simplemde'];

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
      console.log($ctrl.article.data[0].data = $ctrl.text)
   }
};

function _simpleMDE() {
   return {
      restrict: 'A',
      require: 'simplemde',
      link: function (scope, element, attrs, simplemde) {
         simplemde.get();
         simplemde.rerenderPreview();
      }
   }
};

export default angular.module('ArticleEditorModule', ['ArticlesFilters', 'simplemde'])
   .component('articleEditorComponent', ArticleEditorComponent)
   .directive('custom-simplemde', _simpleMDE)
   