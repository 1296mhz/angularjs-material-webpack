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

   $ctrl.voxComment = async function ($mdMenu, $event) {
      if (localStorage.getItem($ctrl.profile.user.id) !== null) {
         let networks = _.find($ctrl.profileStorage, { type: "posting" });
         if (networks !== undefined) {
            console.log("Выберети сеть")
            console.log(networks)
         } else {
            appToastService.send("Нет ни одного ключа для постинга!");
         }
      } else {
         appToastService.send("Нет ни одного ключа!");
      };

    

      /*
      if (localStorage.getItem($ctrl.profile.user.id) !== null) {
         let accountChain = _.findWhere($ctrl.profileStorage, { blockchainName: 'vox' })

         try{
            const res = await voxService.sendComment(
               "vox",
               accountChain.key, //POSTING_KEY
               "cash", // parent_author
               $ctrl.tags[0] || "", //parent_permlink
               accountChain.username, //author
               $ctrl.article.title, //permlink
               $ctrl.article.title, //title
               $ctrl.text, //body
               {}
            )
            console.log(res)
         }catch(err){
            console.log(err)
         }
    
      } else {
         console.log("Нет ключа для постинга")
      }
*/

   };

   $ctrl.shares = async function (bcNetwork, username) {

      let accountChain = _.findWhere($ctrl.networks, { bcNetwork: bcNetwork, username: username, type: "posting" })

      try{
         const res = await voxService.sendComment(
            "vox",
            accountChain.key, //POSTING_KEY
            "cash", // parent_author
            $ctrl.tags[0] || "", //parent_permlink
            accountChain.username, //author
            $ctrl.article.title, //permlink
            $ctrl.article.title, //title
            $ctrl.text, //body
            {}
         )
         console.log(res)
      }catch(err){
         console.log(err)
      }

   }
};

export default angular
   .module("ArticleEditorModule", ["ArticlesFilters", "simplemde"])
   .component("articleEditorComponent", ArticleEditorComponent);
