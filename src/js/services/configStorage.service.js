function _configStorageService() {
  let _storage = {};

  return {
    set: (key, value) => {
      _storage[key] = value;
    },
    get: key => {
      if (!key) {
        return _storage;
      } else {
        return _storage[key];
      }
    }
  };
};

export default angular
  .module("ConfigStorageService", [])
  .factory("configStorageService", _configStorageService);
