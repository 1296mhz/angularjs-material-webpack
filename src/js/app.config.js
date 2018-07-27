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

   let articleNewArticleEditorState = {
      name: 'articleNewArticleEditor',
      url: '/editor',
      component: 'articleEditorComponent'
   };

   let articleEditorState = {
      name: 'articleEditor',
      url: '/editor/{articleId}',
      component: 'articleEditorComponent'
   };

   $stateProvider.state(articlesListState);
   $stateProvider.state(articleNewArticleEditorState);
   $stateProvider.state(articleEditorState);

}