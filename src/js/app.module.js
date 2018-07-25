import './dep.module';
import '@uirouter/angularjs';
import routing from './app.config';
import '../../node_modules/angular-material/angular-material.css';

// import '../css/material-icons.css';
import '../css/style.css';
import './components/screenContent/screenContent.component';
import './components/header/header.component';
import './components/sidebar/sidebar.component';
import './components/articlesList/articlesList.component';
import './components/articleEditor/articleEditor.component';


import ArticlesHttpService from './services/articles.service';

const appModule = angular.module('app', [
   'ui.router',
   'ngMaterial', 'ngAria', 'ngMessages',
   'ScreenContentModule', 
   'HeaderModule', 
   'SidebarModule', 
   'ArticlesListModule', 
   'ArticleEditorModule',
   'ArticlesHttpService' ])
   .config(routing)
   .value('apiServerHost', "localhost:3000");

export default appModule;