
import '../../dep.module';


_homeController.$inject = ['postsHttpService'];

let HomeComponent = {
   template: require('./home.tmpl.html'),
   controller: _homeController
};

function _homeController(postsHttpService) {

   var i = [];
   this.items = [
      { id: "1" },
      { id: "2" }
   ];

   function getPosts() {
      postsHttpService.getPosts().then((data) => {
         // console.log(data.data)
         
         i = data.data
      })
   }

   getPosts()
 
}

export default angular.module('HomeModule', [])
   .component('homeComponent', HomeComponent)