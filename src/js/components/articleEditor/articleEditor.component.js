import "../../filters/ArticlesFilters.module";
import "../../vendor/smde/simplemde-markdown-editor/dist/simplemde.min.css";
//import "../../vendor/smde/simplemde-markdown-editor/src/css/simplemde.css";
import "./articleEditor.css";
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
   $ctrl.text = "";
   $ctrl.tags = [];
   $ctrl.publish_network = [];
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

   // checkbox
   $ctrl.items = $ctrl.networks;
   $ctrl.networksSelected = [];

   $ctrl.toggleNetwork = function (item, list) {
      var idx = list.indexOf(item);
      if (idx > -1) {
         list.splice(idx, 1);
      } else {
         list.push(item);
      }
   };

   $ctrl.existsNetworks = function (item, list) {
      return list.indexOf(item) > -1;
   };

   // checkbox end

   if (articleId !== undefined) {
      $ctrl.spinerActivated = false;
      $ctrl.operation = "Редактирование статьи";
      getArticle();
   } else {
      $ctrl.spinerActivated = false;
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
            $ctrl.publish_network =
               data.data[0].publish_network !== undefined
                  ? JSON.parse(data.data[0].publish_network)
                  : [];
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

      $ctrl.article.publish_network = JSON.stringify($ctrl.publish_network);

      $ctrl.article.data = $ctrl.text;

      $ctrl.article.username = $ctrl.profile.user.name;

      if (articleId !== undefined) {
         console.log("articleId не равно undefined ", articleId);

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
         console.log("articleId иначе", articleId);
         articlesHttpService.addArticle($ctrl.article).then(
            data => {
               console.log(data);
               articleId = data.data.id;
               appToastService.send(data.data.message);
               $ctrl.operation = "Редактирование статьи";
            },
            err => {
               console.log(err);
               appToastService.send(err);
            }
         );
      }
   };
   //Публекуем в сетях
   $ctrl.shares = async function () {
      //console.log($ctrl.networksSelected);
      $ctrl.spinerActivated = true;

      $ctrl.spinerCounter = [];

      function spinerCounterF(a) {
         if (a.length > 0) {
            return true;
         } else {
            return false;
         }
      }

      let spiner = $interval(function () {
         $ctrl.determinateValue += 1;
         if ($ctrl.determinateValue > 100) {
            $ctrl.determinateValue = 0;
         }
      }, 100);

      _.each($ctrl.networksSelected, async (data, i) => {
         $ctrl.spinerCounter.push(i);
         try {
            const network = voxService.getNetwork(data.bcNetwork);
            const POSTING_KEY = data.key;
            const parent_author = data.username;
            const parent_permlink = $ctrl.tags[0];
            const author = data.username;
            const permlink = voxService.createCommentPermlink($ctrl.article.title);
            const title = $ctrl.article.title;
            const body = $ctrl.text;

            const tags = {
               tags: $ctrl.tags
            };

            const json_metadata = JSON.stringify(tags);

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

            // "author", "permlink", "max_accepted_payout", "percent_steem_dollars", "allow_votes", "allow_curation_rewards", "extensions"
            const max_accepted_payout = "1000000.000 SBD";
            const percent_steem_dollars = 0;
            const allow_votes = true;
            const allow_curation_rewards = true;
            const extensions = [];

            const resSendCommentOptions = await voxService.sendCommentOptions(
               network,
               POSTING_KEY,
               author,
               permlink,
               max_accepted_payout,
               percent_steem_dollars,
               allow_votes,
               allow_curation_rewards,
               extensions
            );

            console.log("res: ", res);
            console.log("resSendCommentOptions: ", resSendCommentOptions);

            if (res.name === "RPCError") {
               $ctrl.spinerActivated = false;
               let cause = res.message;
               let causeArray = cause.split(":");

               appToastService.send(
                  "Ошибка размещения на " + data.bcNetwork + ": " + causeArray[2]
               );

               $interval.cancel(spiner);
            } else {
               let resOperations = res.operations[0];

               console.log("resOperations ", resOperations);

               const submit = {
                  _id: res.id,
                  username: $ctrl.article.username,
                  blockchain_author: resOperations[1].author,
                  block_num: res.block_num,
                  ref_block_num: res.ref_block_num,
                  ref_block_prefix: res.ref_block_prefix,
                  expiration: res.expiration,
                  operations: resOperations[0],
                  target: data.bcNetwork,
                  state: "submit_process",
                  permlink: resOperations[1].permlink,
                  award: "0"
               };

               submitService.addSubmit(submit).then(
                  addSubmitData => {

                     $ctrl.publish_network.push({
                        target: data.bcNetwork,
                        block_num: res.block_num,
                        permlink: resOperations[1].permlink
                     });

                     $ctrl.article.tags = $ctrl.tags.join(",");

                     $ctrl.article.publish_network = JSON.stringify(
                        $ctrl.publish_network
                     );

                     $ctrl.article.data = $ctrl.text;
                     $ctrl.article.username = $ctrl.profile.user.name;

                     //Обновляем пост в сети
                     articlesHttpService.updateArticle(articleId, $ctrl.article).then(
                        data => {
                           console.log(data.data.message);
                        },
                        err => {
                           console.log(err);
                           appToastService.send(err);
                        }
                     );
                     getArticle();
                  },
                  err => {
                     console.log(err);
                  }
               );

               //удаление из массива и проверка его размера

               $ctrl.spinerCounter.splice(i, 1);
               $ctrl.spinerActivated = spinerCounterF($ctrl.spinerCounter);
               $interval.cancel(spiner);
               appToastService.send("Опубликовано на " + data.bcNetwork);
            }
         } catch (err) {
            //удаление из массива и проверка его размера
            $ctrl.spinerCounter.splice(i, 1);
            appToastService.send("Ошибка размещения на " + data.bcNetwork);
            $interval.cancel(spiner);
            $ctrl.spinerActivated = spinerCounterF($ctrl.spinerCounter);
            //  console.log(err);
         }
      });
   };

   //Загружаем из сети
   $ctrl.loadArticleFromNetwork = async (objblockNumObject) => {
      console.log(objblockNumObject)
   }
}

export default angular
   .module("ArticleEditorModule", ["ArticlesFilters", "simplemde"])
   .component("articleEditorComponent", ArticleEditorComponent);
