import "../../filters/ArticlesFilters.module";
import "../../vendor/smde/simplemde-markdown-editor/dist/simplemde.min.css";
import "../../vendor/smde/simplemde-angular/dist/simplemde-angular";

_articleEditorController.$inject = [
   "$stateParams",
   "_",
   "$mdMenu",
   "$interval",
   "appToastService",
   "articlesHttpService",
   "configStorageService",
   "voxService",
   "submitService"
];

let ArticleEditorComponent = {
   template: require("./articleEditor.tmpl.html"),
   controller: _articleEditorController
};

function _articleEditorController(
   $stateParams,
   _,
   $mdMenu,
   $interval,
   appToastService,
   articlesHttpService,
   configStorageService,
   voxService,
   submitService
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

   $ctrl.determinateValue = 30;

   $ctrl.profile = configStorageService.get("user");

   $ctrl.profileStorage = JSON.parse(
      localStorage.getItem($ctrl.profile.user.id)
   );

   $ctrl.networks = _.where($ctrl.profileStorage, { type: "posting" });

   if (articleId !== undefined) {
      $ctrl.activated = false;
      $ctrl.operation = "Редактирование статьи";
      getArticle();
   } else {
      $ctrl.activated = false;
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
      $ctrl.article.username = $ctrl.profile.user.name;
      console.log("articleId ", articleId);
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
         // $ctrl.article.state = "created";

         articlesHttpService.addArticle($ctrl.article).then(
            data => {
               console.log(data)
               articleId = data.data.id;
               appToastService.send(data.data.message);
            },
            err => {
               console.log(err)
               appToastService.send(err);
            }
         );
      }
   };

   $ctrl.shares = async function (bcNetwork, username) {
      $ctrl.activated = true;
      // Iterate every 100ms, non-stop and increment
      // the Determinate loader.
      let spiner = $interval(function () {
         $ctrl.determinateValue += 1;
         if ($ctrl.determinateValue > 100) {
            $ctrl.determinateValue = 0;
         }
      }, 100);

      let accountChain = _.findWhere($ctrl.networks, {
         bcNetwork: bcNetwork,
         username: username,
         type: "posting"
      });

      try {
         const network = voxService.getNetwork(bcNetwork);
         const POSTING_KEY = accountChain.key;
         const parent_author = accountChain.username;
         const parent_permlink = $ctrl.tags[0];
         const author = accountChain.username;
         const permlink = voxService.createCommentPermlink($ctrl.article.title);
         const title = $ctrl.article.title;
         const body = $ctrl.text;

         const tags = {
            tags: $ctrl.tags
         }

         const json_metadata = JSON.stringify(tags)

         /*
         let str = $ctrl.article.title
         console.log(str.toLowerCase())
         console.log("PERMLINK NEW: " + voxService.createCommentPermlink($ctrl.article.title))
   */
         const res = await voxService.sendComment(
            network,
            POSTING_KEY,
            parent_author,
            parent_permlink,
            author,
            permlink,
            title,
            body,
            json_metadata
         );

         console.log(res);

         if (res.cause) {
            console.log("Ошибка сохранения: " + res.cause)

            if (res.cause === "RPCError: Assert Exception:( now - auth.last_root_post ) > STEEM_MIN_ROOT_COMMENT_INTERVAL: You may only post once every 5 minutes.") {
               appToastService.send("Отправка поста возможна не чаще раза в пять минут: " + bcNetwork);
            }
         }
         /*
         if(res.cause.message === "Assert Exception:( now - auth.last_root_post ) > STEEM_MIN_ROOT_COMMENT_INTERVAL: You may only post once every 5 minutes."){
            $ctrl.activated = false;
            appToastService.send("Возможно публиковать не чаще чем раз в пять минут. Ошибка размещения на " + bcNetwork);
            $interval.cancel(spiner);
         }
         */
         if (res.name === "RPCError") {
            $ctrl.activated = false;
            appToastService.send("Ошибка размещения на " + bcNetwork);
            $interval.cancel(spiner);
         } else {


            let resOperations = res.operations[0]

            console.log("resOperations ", resOperations)

            const submit = {
               _id: res.id,
               username: $ctrl.article.username,
               blockchain_author: resOperations[1].author,
               block_num: res.block_num,
               ref_block_num: res.ref_block_num,
               ref_block_prefix: res.ref_block_prefix,
               expiration: res.expiration,
               operations: resOperations[0],
               target: bcNetwork,
               state: "submit_process",
               permlink: resOperations[1].permlink,
               award: "0"
            }

            submitService.addSubmit(submit).then((data) => {
               console.log(data)
            }, (err) => {
               console.log(err)
            });

            $ctrl.activated = false;
            $interval.cancel(spiner);
            appToastService.send("Опубликовано на " + bcNetwork);
         }
      } catch (err) {
         appToastService.send("Ошибка размещения на " + bcNetwork);
         $interval.cancel(spiner);
         $ctrl.activated = false;
         console.log(err);
      }
   };
}

export default angular
   .module("ArticleEditorModule", ["ArticlesFilters", "simplemde"])
   .component("articleEditorComponent", ArticleEditorComponent);
