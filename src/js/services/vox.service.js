const voxLib = require('../vendor/chain-js/index');

(async (network)=>{
   const POSTING_KEY = ".....";
   const permlink = createCommentPermlink("vugluskr");
   const res = await comment(network, POSTING_KEY, "", "ru-test", "vugluskr", permlink, "test", "test body", {});
   console.log(res);
})(getNetwork("vox"));

//   "params": ["parent_author", "parent_permlink", "author", "permlink", "title", "body", "json_metadata"]
async function _voxService() {
   return {
      comment: (network, POSTING_KEY, parent_author, parent_permlink, author, permlink, title, body, json_metadata) => {
       
            const parent_author: parent_author || "";
            const parent_permlink: parent_permlink || "";
            const author: author || "";
            const title: title || "unknown";
            const body: body || "unknown";
            const json_metadata: json_metadata || {};
      
       const permlink = createCommentPermlink(parent_author);
         const res = await comment(network, POSTING_KEY, parent_author, parent_permlink, author, permlink, title, body, json_metadata);
         return res
      }
   }
}

export default angular.module('VoxServiceModule', [])
   .factory('voxService', _voxService)