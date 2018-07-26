
import '../../filters/ArticlesFilters.module';
import '../../vendor/smde/simplemde-markdown-editor/dist/simplemde.min.css';
import '../../vendor/smde/simplemde-angular/dist/simplemde-angular';

_articleEditorController.$inject = ['$rootScope', 'articlesHttpService', '$stateParams'];
//_simpleMDE.$inject = ['$rootScope', 'simplemde'];

let ArticleEditorComponent = {
  template: require('./articleEditor.tmpl.html'),
  controller: _articleEditorController,
  bindings: {
    articlea: '<'
  }
};

function _articleEditorController($rootScope, articlesHttpService, $stateParams) {

  let articleId = $stateParams.articleId;
  let $ctrl = this;

  $ctrl.tags = [];
  $ctrl.text = '';
  $ctrl.article = {};
  $ctrl.article.data = '';
  //console.log($stateParams.articleId);

  function getArticle() {
    articlesHttpService.getArticle(articleId).then((data) => {
      $ctrl.article.id = data.data[0].id;
      $ctrl.article.title = data.data[0].title;
      $ctrl.article.username = data.data[0].username;
      $ctrl.article.state = data.data[0].state;
      let ggg = data.data[0].data;
      console.log(ggg)
      $ctrl.text = ggg
      $rootScope.$emit('refreshEditor',{});
      $ctrl.article.tags = data.data[0].tags.split(',')
      $ctrl.article.created_at = data.data[0].created_at;
      $ctrl.article.updated_at = data.data[0].updated_at;
      console.log($ctrl.article)
    },
      (err) => {
        console.log(err)
      });
  }

  $ctrl.saveButton = function () {
  
    // if ($ctrl.article.data !== undefined) {
      // $ctrl.article.data === $ctrl.text
    // }
  }

  getArticle();
};
/*
function _simpleMDE() {
  return {
    restrict: 'A',
    require: 'simplemde',
    link: function (scope, element, attrs, simplemde) {
      console.log("SCOPE: ", scope)
      simplemde.get();
      simplemde.rerenderPreview();
    }
  }
};
*/
export default angular.module('ArticleEditorModule', ['ArticlesFilters', 'simplemde'])
  .component('articleEditorComponent', ArticleEditorComponent)
  // .directive('custom-simplemde', _simpleMDE)
