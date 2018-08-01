import "../../filters/ArticlesFilters.module";
import "../../vendor/smde/simplemde-markdown-editor/dist/simplemde.min.css";
import "../../vendor/smde/simplemde-angular/dist/simplemde-angular";

_articleEditorController.$inject = [
   "$stateParams",
   "appToastService",
   "articlesHttpService",
   "configStorageService",
   "voxService"
];

let ArticleEditorComponent = {
   template: require("./articleEditor.tmpl.html"),
   controller: _articleEditorController
};

function _articleEditorController(
   $stateParams,
   appToastService,
   articlesHttpService,
   configStorageService,
   voxService
)
{
   let articleId = $stateParams.articleId;
   let $ctrl = this;
   $ctrl.operation = "";
   $ctrl.tags = [];
   $ctrl.text = "";
   $ctrl.tags = [];
   $ctrl.createdAt = "";
   $ctrl.updatedAt = "";
   $ctrl.article = {};
   $ctrl.article.data = "";
   $ctrl.readonlyTag = true;

   console.log("Article editor");
   $ctrl.profile = configStorageService.get("user");

   console.log("Username: ", $ctrl.profile.user.name);

   if (articleId !== undefined) {
      $ctrl.operation = "Редактирование статьи";
      getArticle();
   } else {
      $ctrl.operation = "Создание новой статьи";
   }

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
         },
         err => {
            console.log(err);
         }
      );
   }

   $ctrl.saveArticleButton = function () {
      $ctrl.article.tags = $ctrl.tags.join(",");
      $ctrl.article.data = $ctrl.text;
      $ctrl.article.username = $ctrl.profile.user.name
      if (articleId !== undefined) {
         console.log($ctrl.article);
         articlesHttpService.updateArticle(articleId, $ctrl.article).then(
            data => {
               console.log(data.data.message);
               appToastService.send(data.data.message);
            },
            err => {
               console.log(err);
               appToastService.send(err);
            }
         );
         getArticle();
      } else {
         $ctrl.article.state = "created";
         console.log("Новый", $ctrl.article)
         articlesHttpService.addArticle($ctrl.article).then(
            data => {
               appToastService.send(data.data.message);
            },
            err => {
               appToastService.send(err);
            }
         );
      }
   };

$ctrl.voxComment = function(){
   voxService.comment("vox", )
}

}

export default angular
   .module("ArticleEditorModule", ["ArticlesFilters", "simplemde"])
   .component("articleEditorComponent", ArticleEditorComponent);
