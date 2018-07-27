import "../../filters/ArticlesFilters.module";
import "../../vendor/smde/simplemde-markdown-editor/dist/simplemde.min.css";
import "../../vendor/smde/simplemde-angular/dist/simplemde-angular";

_articleEditorController.$inject = ["articlesHttpService", "$stateParams", "$mdToast"];

let ArticleEditorComponent = {
   template: require("./articleEditor.tmpl.html"),
   controller: _articleEditorController
};

function _articleEditorController(articlesHttpService, $stateParams, $mdToast) {

   let articleId = $stateParams.articleId;
   let $ctrl = this;
   $ctrl.operation = '';
   $ctrl.tags = [];
   $ctrl.text = "";
   $ctrl.tags = [];
   $ctrl.createdAt = "";
   $ctrl.updatedAt = "";
   $ctrl.article = {};
   $ctrl.article.data = "";
   $ctrl.readonlyTag = true;

   if(articleId !== undefined){
      console.log("Существует")
      $ctrl.operation = "Редактирование статьи";
      getArticle();
   } else {
      $ctrl.operation = "Создание новой статьи";
      console.log("Новая")
   }
   
   function showSimpleToast(message) {
      $mdToast.show(
         $mdToast.simple()
            .textContent(message)
            .position("top right")
            .hideDelay(3000)
      );
   };

   //toast end
   function getArticle() {
      articlesHttpService.getArticle(articleId).then(
         data => {
            $ctrl.article.id = data.data[0].id;
            $ctrl.article.title = data.data[0].title;
            $ctrl.article.username = data.data[0].username;
            $ctrl.article.state = data.data[0].state;
            $ctrl.text = data.data[0].data;
            $ctrl.tags = data.data[0].tags.split(",");
            $ctrl.createdAt = data.data[0].created_at;
            $ctrl.updatedAt = data.data[0].updated_at;
            console.log($ctrl.article);
         },
         err => {
            console.log(err);
         }
      );
   }

   $ctrl.saveArticleButton = function () {
      $ctrl.article.tags = $ctrl.tags.join(",");
      $ctrl.article.data = $ctrl.text;

      console.log($ctrl.article);
      articlesHttpService.updateArticle(articleId, $ctrl.article).then(
         (data) => {
            console.log(data.data.message);
            showSimpleToast(data.data.message);
         },
         (err) => {
            console.log(err)
            showSimpleToast(err);
         }
      );
      // if ($ctrl.article.data !== undefined) {
      // $ctrl.article.data === $ctrl.text
      // }
   };
}

export default angular
   .module("ArticleEditorModule", ["ArticlesFilters", "simplemde"])
   .component("articleEditorComponent", ArticleEditorComponent);
