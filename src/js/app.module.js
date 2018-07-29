import "./dep.module";
import "@uirouter/angularjs";
import routing from "./app.config";
import "../../node_modules/angular-material/angular-material.css";

// import '../css/material-icons.css';
import "../css/style.css";
import "./components/screenContent/screenContent.component";
import "./components/header/header.component";
import "./components/sidebar/sidebar.component";
import "./components/articlesList/articlesList.component";
import "./components/articleEditor/articleEditor.component";

import ArticlesHttpService from "./services/articles.service";
import ProfileHttpService from "./services/profile.service";
import ConfigStorageService from "./services/configStorage.service";

var appModule = angular
  .module("app", [
    "ui.router",
    "ngMaterial",
    "ngAria",
    "ngMessages",
    "ScreenContentModule",
    "HeaderModule",
    "SidebarModule",
    "ArticlesListModule",
    "ArticleEditorModule",
    "ArticlesHttpService",
    "ProfileHttpService",
    "ConfigStorageService"    
  ])
  .config(routing)
  .constant("apiServerHost", "localhost:3001")

export default appModule;
