import "./dep.module";

import apiServerHost from "./constants/apiServerHost.constant";
import pageTexts from "./constants/pageTexts.constant";
import chainConstants from "./constants/chain.constant";
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
import "./components/profile/profile.component";

import ArticlesHttpService from "./services/articles.service";
import SubmitsHttpService from "./services/submit.service";
import ProfileHttpService from "./services/profile.service";
import ConfigStorageService from "./services/configStorage.service";
import AppToastServiceModule from "./services/appToast.service";
import VoxServiceModule from "./services/vox.service";

var appModule = angular
  .module("app", [
    "ui.router",
    "ngMaterial",
    "ngAria",
    "ngMessages",
    "underscore",
    "angularMoment",
    "angular-uuid",
    "ScreenContentModule",
    "HeaderModule",
    "SidebarModule",
    "ArticlesListModule",
    "ArticleEditorModule",
    "ProfileModule",
    "ArticlesHttpService",
    "SubmitsHttpService",
    "ProfileHttpService",
    "ConfigStorageService",
    "AppToastServiceModule",
    "VoxServiceModule"
  ])
  .config(routing)
  .constant("apiServerHost", apiServerHost)
  .constant("pageTexts", pageTexts)
  .constant("chainConstants", chainConstants)
 

export default appModule;
