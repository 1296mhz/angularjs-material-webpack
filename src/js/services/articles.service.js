_articlesHttpService.$inject = ['$http', 'apiServerHost'];

function _articlesHttpService($http, apiServerHost) {
   return {
      getArticles: () => {
        return $http.get('http://'+ apiServerHost + '/api/v1/articles');
      },
      getArticle: (id) => {
         return $http.get('http://'+ apiServerHost + '/api/v1/articles/' + id);
       },
       updateArticle: (id, data) => {
        return $http.put('http://'+ apiServerHost + '/api/v1/articles/' + id, data);
       }
    } 
}

export default angular.module('ArticlesHttpService', [])
    .factory('articlesHttpService', _articlesHttpService)