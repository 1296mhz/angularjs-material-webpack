"use strict";
const voxLib = require('../vendor/chain-js/index');

/*
(async (network)=>{
   const POSTING_KEY = ".....";
   const permlink = createCommentPermlink("vugluskr");
   const res = await comment(network, POSTING_KEY, "", "ru-test", "vugluskr", permlink, "test", "test body", {});
   console.log(res);
})(getNetwork("vox"));
*/
//   "params": ["parent_author", "parent_permlink", "author", "permlink", "title", "body", "json_metadata"]

 function _voxService() {
   return {
      comment: async (network, POSTING_KEY, parent_author, parent_permlink, author, permlink, title, body, json_metadata) => {
       
            parent_author || "";
            parent_permlink || "";
            author || "";
            title || "unknown";
            body || "unknown";
            json_metadata || {};
      
         permlink = voxLib.createCommentPermlink(parent_author);
         const res = await voxLib.comment(network, POSTING_KEY, parent_author, parent_permlink, author, permlink, title, body, json_metadata);
         return res
      }
   }
}

export default angular.module('VoxServiceModule', [])
   .factory('voxService', _voxService)