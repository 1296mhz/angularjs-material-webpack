_screenContentController.$inject = [
  "profileHttpService",
  "configStorageService"
];

let ScreenContentComponent = {
  template: require("./screenContent.tmpl.html"),
  controller: _screenContentController
};

function _screenContentController(profileHttpService, configStorageService) {
  let $ctrl = this;
  $ctrl.config = {};
  console.log("Screen component contoller");

  function _getProfile() {
    profileHttpService.getProfile().then(
      data => {
        configStorageService.set("user", data.data);
      },
      err => {
        console.log(err);
      }
    );
  }

  _getProfile();
  $ctrl.config = configStorageService.get();

}

export default angular
  .module("ScreenContentModule", [])
  .component("screenContentComponent", ScreenContentComponent)
  .controller("screenContentController", _screenContentController);
