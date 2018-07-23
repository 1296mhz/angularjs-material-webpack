import './vendor.module';
import '@uirouter/angularjs';
import routing from './app.config';
import '../../node_modules/angular-material/angular-material.css';
import '../css/style.css';
import '../../node_modules/roboto-fontface/css/roboto/roboto-fontface.css';
//import '../../node_modules/webpack-material-design-icons/material-design-icons.css';
import '../../node_modules/material-design-icons/iconfont/material-icons.css';
import '../../node_modules/roboto-fontface/css/roboto/roboto-fontface.css';
import './components/screenContent/screenContent.component';
import './components/header/header.component';
import './components/sidebar/sidebar.component';
import './components/home/home.component';
import './components/infinityScroll/infinityScroll.component';
const appModule = angular.module('app', ['ui.router', 'ngMaterial', 'ngAria', 'ngMessages', 'ScreenContentModule', 'HeaderModule', 'SidebarModule', 'HomeModule', 'InfinityScrollModule'])
	.config(routing);

export default appModule;