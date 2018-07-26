import './components/articlesList/articlesList.component';
import './components/articleEditor/articleEditor.component';

routing.$inject = ['$urlRouterProvider', '$locationProvider', '$stateProvider'];

export default function routing($urlRouterProvider, $locationProvider, $stateProvider) {
  $locationProvider.html5Mode(true);
  $urlRouterProvider.otherwise('/');

  let articlesListState = {
    name: 'articlesList',
    url: '/',
    component: 'articlesListComponent',
  };

  let articleEditorState = {
   name: 'articleEditor',
   url: '/editor/{articleId}',
   component: 'articleEditorComponent',
   resolve: {
      article: function($transition$, articlesHttpService) {
        return articlesHttpService.getArticle($transition$.params().articleId);
      }
    }
 };

  $stateProvider.state(articlesListState);
  $stateProvider.state(articleEditorState);

}