
const chainjs = require('../vendor/chain-js/index');

function _chainjsService() {
   return chainjs
};

export default angular.module('ChainJsModule', [])
   .factory('chainJsService', _chainjsService);