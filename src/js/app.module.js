import './dep.module';
import '@uirouter/angularjs';
import routing from './app.config';
import '../../node_modules/angular-material/angular-material.css';

// import '../css/material-icons.css';
import '../css/style.css';
import './components/screenContent/screenContent.component';
import './components/header/header.component';
import './components/sidebar/sidebar.component';
import './components/home/home.component';
import './components/infinityScroll/infinityScroll.component';

import PostsHttpService from './services/posts.service';

const appModule = angular.module('app', [
   'ui.router',
   'ngMaterial', 'ngAria', 'ngMessages',
   'ScreenContentModule', 'HeaderModule', 'SidebarModule', 'HomeModule', 'InfinityScrollModule',
   'PostsHttpService' ])
   .config(routing);

export default appModule;