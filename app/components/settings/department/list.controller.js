(function() {
  'use strict';

  angular
    .module('merchantApp')
    .controller('DepartmentListController', DepartmentListController);

  DepartmentListController.$inject = ['$compile', '$scope', 'DepartmentService', 'DTOptionsBuilder', 'DTColumnBuilder','$uibModal','toaster'];

  function DepartmentListController($compile, $scope, DepartmentService, DTOptionsBuilder, DTColumnBuilder,$uibModal,toaster) {
    var vm = this;
    vm.admins = {};
    vm.remove = remove;
    vm.create = create;
    vm.edit = edit;
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
        // .withOption('lengthChange', false)
        // .withOption('filter', false)
        .withOption('createdRow', createdRow);

      vm.dtColumns = [
        DTColumnBuilder.newColumn(null).withTitle('#').withOption('width', '20px').notSortable().renderWith(function(data, type, full, meta) {
          return meta.row + meta.settings.oAjaxData.start + 1;
        }),
        DTColumnBuilder.newColumn('name').withTitle('科室').notSortable(),
        DTColumnBuilder.newColumn('courseNum').withTitle('进修班').notSortable(),
        DTColumnBuilder.newColumn('applierNum').withTitle('申请者').notSortable(),
        DTColumnBuilder.newColumn(null).withTitle('操作').notSortable().renderWith(actionsHtml)
      ];

      vm.dtInstance = {};
    }

    function dtAjax(data, callback, settings) {
      DepartmentService
      .departments(convertDtData(data))
        .then(function(res) {
          callback(convertDtResponse(res.data));
        });
    }

    function actionsHtml(data, type, full, meta) {
      vm.admins[data.admin_id] = full;
      return '<button class="btn btn-white btn-xs" uib-tooltip="修改" ng-click="vm.edit('+ data.id +')">' +
        '   <i class="fa fa-edit"></i>' +
        '</button>&nbsp;' +
        '<button class="btn btn-white btn-xs" uib-tooltip="删除" confirm="删除该科室后,该科室所有信息将清空" ng-click="vm.remove(' + data.id + ')">' +
        '   <i class="fa fa-trash-o"></i>' +
        '</button>&nbsp;';
    }
    function createdRow(row, data, dataIndex) {
      // Recompiling so we can bind Angular directive to the DT
      $compile(angular.element(row).contents())($scope);
    }
    function create() {
        $uibModal.open({
          animation:true,
          templateUrl:'components/settings/department/create.html',
          controller:'DepCreateController as vm',
          size:'md',
          resolve: {
            editId: function () {
              return null;
            }
          }
        })
    }
    function edit(id) {
      $uibModal.open({
        animation:true,
        templateUrl:'components/settings/department/create.html',
        controller:'DepCreateController as vm',
        size:'md',
        resolve: {
          editId: function () {
            return id;
          }
        }
      })
    }

    function remove(adminId) {
      DepartmentService.departmentDelete(adminId)
        .then(function() {
          toaster.pop('success','删除成功');
          vm.dtInstance.reloadData(null, false);
        })
    }
  }
})();
