'use strict';

angular
  .module('merchantApp')
  .controller('MembersListController', MembersListController);

MembersListController.$inject = ['$compile', '$scope', '$stateParams', 'toaster', 'MemberService', 'DTOptionsBuilder', 'DTColumnBuilder', '$uibModal','ExportService'];

function MembersListController($compile, $scope, $stateParams, toaster, MemberService, DTOptionsBuilder, DTColumnBuilder, $uibModal,ExportService) {
  var vm = this;
  vm.status = $stateParams.status;
  vm.courses = {};
  vm.exportMembers = exportMembers;
  vm.download = download;
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
      .withOption('createdRow', createdRow)
      .withOption('order', [
        [1, 'desc']
      ]);

    vm.dtColumns = [
      DTColumnBuilder.newColumn(null).withTitle('#').withOption('width', '20px').notSortable().renderWith(function(data, type, full, meta) {
        return meta.row + meta.settings.oAjaxData.start + 1;
      }),
      DTColumnBuilder.newColumn('name').withTitle('申请人'),
      DTColumnBuilder.newColumn('mobile').withTitle('手机号'),
      DTColumnBuilder.newColumn('org_name').withTitle('单位'),
      DTColumnBuilder.newColumn('tech_duty').withTitle('职称'),
      DTColumnBuilder.newColumn('course').withTitle('进修班'),
      DTColumnBuilder.newColumn(null).withTitle('操作').withOption('width', '60px').notSortable()
        .renderWith(actionsHtml)
    ];

    vm.dtInstance = {};
  }

  function dtAjax(data, callback, settings) {
    var params = convertDtData(data);
    params['status'] = vm.status;
    MemberService.list(params)
      .then(function(res) {
        callback(convertDtResponse(res.data));
      });
  }
  function exportMembers() {
    ExportService
      .exportFile('/studentsExport','学员列表',{},'PUT')
      .then(function (res) {

      })
  }

  function nameHtml(data, type, full, meta) {
    return '<a ui-sref="admin.courses.show({courseId: ' + full.id + '})">' + data + '</a>';
  }

  function actionsHtml(data, type, full, meta) {
    vm.courses[full.id] = full;
   return '<button class="btn btn-white btn-xs" uib-tooltip="查看信息" ui-sref="admin.members.show({membersId: ' + data.id + '})">' +
      '   <i class="fa fa-fw fa-edit"></i>' +
     '</button>&nbsp;' +
     '<button class="btn btn-white btn-xs" uib-tooltip="下载申请表" ng-click="vm.download('+ data.id +')">' +
     ' <i class="fa fa-download" aria-hidden="true"></i>' +
     '</button>&nbsp;';
  }
  function download(id) {
    var params = {};
    ExportService
      .exportFile('/application/' + id + '/downloadApplication', "申请表",params,'GET')
      .then(function (res) {

      })
  }
  function createdRow(row, data, dataIndex) {
    // Recompiling so we can bind Angular directive to the DT
    $compile(angular.element(row).contents())($scope);
  }
}
