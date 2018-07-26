
import '../../filters/ArticlesFilters.module';
import '../../vendor/smde/simplemde-markdown-editor/dist/simplemde.min.css';
import '../../vendor/smde/simplemde-angular/dist/simplemde-angular';

_articleEditorController.$inject = ['articlesHttpService', '$stateParams'];
_simpleMDE.$inject = ['simplemde'];

let ArticleEditorComponent = {
   template: require('./articleEditor.tmpl.html'),
   controller: _articleEditorController,
   bindings: {
      article: '<'
   }
};

function _articleEditorController(articlesHttpService, $stateParams) {

   let $ctrl = this;
   $ctrl.tags = [];

   console.log( $stateParams.articleId )
   $ctrl.saveButton = function () {
     console.log($ctrl.article.data[0].tags)
      console.log($ctrl.text)
      if($ctrl.text !== undefined){
        $ctrl.article.data[0].data === $ctrl.text
      }
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
   