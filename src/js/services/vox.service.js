import ChainJsModule from './chainjs.service'

_voxService.$inject = ['chainJsService'];

function _voxService(chainJsService) {
   return {

      /**
       * @param  {} network - Сеть vox, golos, steem
       * @param  {} POSTING_KEY - Ключ для постинга
       * @param  {} parent_author - "" for a new post
       * @param  {} parent_permlink - main tag 
       * @param  {} author -  author username
       * @param  {} permlink - post permlink
       * @param  {} title - post title
       * @param  {} body - post body
       * @param  {} json_metadata
       */

      getNetwork: (network) => {
         const result = chainJsService.getNetwork(network);
         return result
      },
      createCommentPermlink: (permlink) =>{
         let resultPermlink = chainJsService.createCommentPermlink(permlink);
         return resultPermlink
      },
      sendComment: async (network, POSTING_KEY, parent_author, parent_permlink, author, permlink, title, body, json_metadata) => {
                    
         try{
            const res = await chainJsService.comment(network, POSTING_KEY, "", parent_permlink, author, permlink, title, body, json_metadata);
            return res;
         }catch(err){
            return err
         }
         
      }
   }
}

export default angular.module('VoxServiceModule', ['ChainJsModule'])
   .factory('voxService', _voxService)