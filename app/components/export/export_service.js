/**
 * Created by yong on 16/5/26.
 */
(function() {
  'use strict';

  angular
    .module('merchantApp')
    .service('ExportService', ExportService);

  ExportService.$inject = ['$http','ENDPOINT'];

  /* @ngInject */
  function ExportService($http,ENDPOINT) {
    this.exportFile = exportFile;

    function exportFile(url, filename, params,method) {
      return $http({
        url: ENDPOINT + url,
        method: method,
        params: params,
        responseType: 'arraybuffer'
      }).success(function(data, status, headers, config) {
        var file = new Blob([data], {
          type: headers('Content-Type')
        });
        //trick to download store a file having its URL
        var fileURL = URL.createObjectURL(file);
        var a = document.createElement('a');
        a.href = fileURL;
        a.target = '_blank';
        a.download = filename;
        document.body.appendChild(a);
        a.click();
      }).error(function(data, status, headers, config) {});
    }
  }
})();
