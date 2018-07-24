_postsHttpService.$inject = ['$http'];

function _postsHttpService($http) {
   return {
      getPosts: () => {
        return $http.get('http://localhost:3000/api/v1/posts');
      }
    } 
}

export default angular.module('PostsHttpService', [])
    .factory('postsHttpService', _postsHttpService)