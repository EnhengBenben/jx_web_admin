
'use strict';

angular
  .module('merchantApp')
  .controller('ApplicationProfessionalListController', ApplicationProfessionalListController);

ApplicationProfessionalListController.$inject = ['$compile', '$scope', '$stateParams', 'toaster', 'ApplicationService', 'DTOptionsBuilder', 'DTColumnBuilder', '$uibModal'];

function ApplicationProfessionalListController($compile, $scope, $stateParams, toaster, ApplicationService, DTOptionsBuilder, DTColumnBuilder, $uibModal) {
  var vm = this;
  vm.status = $stateParams.status;
  vm.courses = {};

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
        [2, 'desc']
      ]);

    vm.dtColumns = [
      DTColumnBuilder.newColumn(null).withTitle('#').withOption('width', '20px').notSortable().renderWith(function(data, type, full, meta) {
        return meta.row + meta.settings.oAjaxData.start + 1;
      }),
      DTColumnBuilder.newColumn('techDuty.data.name').withTitle('技术职称'),
      DTColumnBuilder.newColumn('score').withTitle('积分'),
      DTColumnBuilder.newColumn('instruction').withTitle('说明'),
      DTColumnBuilder.newColumn(null).withTitle('操作').notSortable()
        .renderWith(actionsHtml)
    ];

    vm.dtInstance = {};
  }

  function dtAjax(data, callback, settings) {
    var params = convertDtData(data);
    //params['status'] = vm.status;
    ApplicationService
      .techDutyScores(params)
      .then(function(res) {
        callback(convertDtResponse(res.data));
      });
  }

  function nameHtml(data, type, full, meta) {
    return '<a ui-sref="admin.courses.show({courseId: ' + full.id + '})">' + data + '</a>';
  }

  function actionsHtml(data, type, full, meta) {
    vm.courses[full.id] = full;
    return '<button class="btn btn-white btn-xs" uib-tooltip="编辑" ui-sref="admin.application.professionalEdit({id: ' + data.id + '})">' +
      '   <i class="fa fa-fw fa-edit"></i>';
  }
  function createdRow(row, data, dataIndex) {
    // Recompiling so we can bind Angular directive to the DT
    $compile(angular.element(row).contents())($scope);
  }
}

