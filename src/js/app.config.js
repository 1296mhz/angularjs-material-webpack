import './components/home/home.component';

routing.$inject = ['$urlRouterProvider', '$locationProvider', '$stateProvider'];

export default function routing($urlRouterProvider, $locationProvider, $stateProvider) {
  $locationProvider.html5Mode(true);
  $urlRouterProvider.otherwise('/');

  let homeState = {
    name: 'home',
    url: '/',
    component: 'homeComponent'
  };

  $stateProvider.state(homeState);

}