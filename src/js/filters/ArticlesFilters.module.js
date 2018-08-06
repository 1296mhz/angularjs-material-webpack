import angular from "angular";

function cropString() {
  return function(str) {
    let ourString = str.substr(0, 99);
    return ourString + "...";
  };
}

function stringToArray() {
  return function(str) {
    let ourArray = str.split(", ");
    return ourArray;
  };
}

function sortDate(date) {
   let dateResult = new Date(date);
   return dateResult;
};

export default angular
  .module("ArticlesFilters", [])
  .filter("cropString", cropString)
  .filter("stringToArray", stringToArray)
  .filter("sortDate", sortDate);
