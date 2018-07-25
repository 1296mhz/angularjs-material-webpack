import './components/articlesList/articlesList.component';

routing.$inject = ['$urlRouterProvider', '$locationProvider', '$stateProvider'];

export default function routing($urlRouterProvider, $locationProvider, $stateProvider) {
  $locationProvider.html5Mode(true);
  $urlRouterProvider.otherwise('/');

  let articlesListState = {
    name: 'articlesList',
    url: '/',
    component: 'articlesListComponent'
  };

  $stateProvider.state(articlesListState);

}