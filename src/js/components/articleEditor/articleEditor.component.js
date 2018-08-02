import "../../filters/ArticlesFilters.module";
import "../../vendor/smde/simplemde-markdown-editor/dist/simplemde.min.css";
import "../../vendor/smde/simplemde-angular/dist/simplemde-angular";

_articleEditorController.$inject = [
   "$stateParams",
   "_",
   "$mdMenu",
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
   _,
   $mdMenu,
   appToastService,
   articlesHttpService,
   configStorageService,
   voxService
) {
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
   $ctrl.profileStorage = JSON.parse(localStorage.getItem($ctrl.profile.user.id));
   $ctrl.networks = _.where($ctrl.profileStorage, { type: "posting" });
   console.log("networ", $ctrl.networks)

   console.log("Username: ", $ctrl.profile.user.name);

   if (articleId !== undefined) {
      $ctrl.operation = "Редактирование статьи";
      getArticle();
   } else {
      $ctrl.operation = "Создание новой статьи";
   };

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
      $ctrl.article.username = $ctrl.profile.user.name;
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
      };
   };

   $ctrl.shares = async function (bcNetwork, username) {
      console.log(bcNetwork, username)
      let accountChain = _.findWhere($ctrl.networks, { bcNetwork: bcNetwork, username: username, type: "posting" })
     
      try {
         const network = voxService.getNetwork(bcNetwork)
         const POSTING_KEY = accountChain.key;
         const parent_author = accountChain.username;
         const parent_permlink = $ctrl.tags[0];
         const author = accountChain.username;
         const permlink = voxService.createCommentPermlink(accountChain.username);
         const title = $ctrl.article.title;
         const body = $ctrl.text;
         console.log(body)
         // network, POSTING_KEY, "", "ru-test", "cash", permlink, "test", "test body", {}
         //const res = await voxService.sendComment(network, POSTING_KEY, parent_author, parent_permlink, author, permlink, title, body, {});
       //  const res = await voxService.sendComment(network, POSTING_KEY, "", "ru-test", author, permlink, "test", "Hello world", {});
         console.log(res)
      } catch (err) {
         console.log(err)
      }

   }
};

export default angular
   .module("ArticleEditorModule", ["ArticlesFilters", "simplemde"])
   .component("articleEditorComponent", ArticleEditorComponent);
