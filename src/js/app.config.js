import './components/infinityScroll/infinityScroll.component';
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

  let infinityScrollState = {
    name: 'infinityScroll',
    url: '/infinityScroll',
    component: 'infinityScrollComponent'
  };

  $stateProvider.state(homeState);
  $stateProvider.state(infinityScrollState);

}