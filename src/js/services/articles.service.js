_articlesHttpService.$inject = ['$http', 'apiServerHost'];

function _articlesHttpService($http, apiServerHost) {
   return {
      getArticles: () => {
        return $http.get('http://'+ apiServerHost + '/api/v1/articles');
      }
    } 
}

export default angular.module('ArticlesHttpService', [])
    .factory('articlesHttpService', _articlesHttpService)