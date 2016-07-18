(function() {
  'use strict';

  angular
    .module('merchantApp')
    .controller('AdminListController', AdminListController);

  AdminListController.$inject = ['$compile', '$scope', 'AdminService', 'DTOptionsBuilder', 'DTColumnBuilder'];

  function AdminListController($compile, $scope, AdminService, DTOptionsBuilder, DTColumnBuilder) {
    var vm = this;
    vm.admins = {};
    vm.remove = remove;
    vm.departments = [];
    return init();

    function init() {
      initDt();

      $scope.$watch('vm.filter', function(newValue, oldValue) {
        if (newValue != oldValue) {
          vm.dtInstance.reloadData();
        }
      }, true);
    }


    function initDt() {
      vm.dtOptions = DTOptionsBuilder.newOptions()
        .withOption('ajax', dtAjax)
        .withDataProp('data')
        .withOption('lengthChange', false)
        .withOption('filter', false)
        .withOption('createdRow', createdRow);

      vm.dtColumns = [
        DTColumnBuilder.newColumn('id').withTitle('ID'),
        DTColumnBuilder.newColumn('username').withTitle('登录账号').notSortable(),
        DTColumnBuilder.newColumn('contact').withTitle('联系人').notSortable(),
        DTColumnBuilder.newColumn('mobile').withTitle('联系电话').notSortable(),
        DTColumnBuilder.newColumn('department.data').withTitle('审核科室').notSortable().renderWith(departmentHtml),
        DTColumnBuilder.newColumn(null).withTitle('操作').notSortable().renderWith(actionsHtml)
      ];

      vm.dtInstance = {};
    }

    function dtAjax(data, callback, settings) {
      var params = convertDtData(data);
      params['include'] = 'department';
      AdminService.
      list(params)
        .then(function(res) {
          callback(convertDtResponse(res.data));
        });
    }

    function actionsHtml(data, type, full, meta) {
      vm.admins[data.admin_id] = full;
      return '<button class="btn btn-white btn-xs" uib-tooltip="编辑" ui-sref="admin.settings.admins.edit({adminId: ' + data.id + '})">' +
        '   <i class="fa fa-edit"></i>' +
        '</button>&nbsp;' +
        '<button class="btn btn-white btn-xs" uib-tooltip="删除" ng-click="vm.remove(' + data.id + ')">' +
        '   <i class="fa fa-trash-o"></i>' +
        '</button>&nbsp;';
    }
    function departmentHtml(data,type,full,meta) {
      vm.departments = [];
      angular.forEach(full.department.data,function (i) {
         vm.departments.push(i.name);
      });
      return vm.departments;
    }

    function createdRow(row, data, dataIndex) {
      // Recompiling so we can bind Angular directive to the DT
      $compile(angular.element(row).contents())($scope);
    }

    function remove(adminId) {
      AdminService.remove(adminId)
        .then(function() {
          vm.dtInstance.reloadData(null, false);
        })
    }
  }
})();
