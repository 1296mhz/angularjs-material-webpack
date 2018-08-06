import ChainJsModule from './chainjs.service'

_submitService.$inject = ['chainJsService'];

function _submitService(chainJsService) {
   return {
      getSubmits: () => {
         return $http.get('http://' + apiServerHost + '/api/v1/submits');
      },
      getSubmit: (id) => {
         return $http.get('http://' + apiServerHost + '/api/v1/submits/' + id);
      },
      addSubmit: (data) => {
         return $http.post('http://' + apiServerHost + '/api/v1/submits/', data);
      },
      updateSubmit: (id, data) => {
         return $http.put('http://' + apiServerHost + '/api/v1/submits/' + id, data);
      },
      deleteSubmit: (id) => {
         return $http.delete('http://' + apiServerHost + '/api/v1/submits/' + id);
      }
   }
}

export default angular.module('SubmitsHttpService', ['ChainJsModule'])
   .factory('submitService', _submitService)
