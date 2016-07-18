'use strict';

angular
  .module('merchantApp')
  .controller('CourseListController', CourseListController);

CourseListController.$inject = ['$compile', '$scope', '$stateParams', 'toaster', 'CourseService','DepartmentService', 'DTOptionsBuilder', 'DTColumnBuilder', '$uibModal'];

function CourseListController($compile, $scope, $stateParams, toaster, CourseService,DepartmentService, DTOptionsBuilder, DTColumnBuilder, $uibModal) {
  var vm = this;
  vm.status = $stateParams.status;
  vm.courses = {};
  vm.years = [];
  vm.publish = publish;
  vm.unPublish = unPublish;
  var y = (new Date()).getUTCFullYear() + 10;
  for (var i = 2010; i <= y; i += 1) {
    vm.years.push(i);
  }
  return init();

  function init() {
    var params = {
      limit:1000
    }
    DepartmentService
      .departments(params)
      .then(function (res) {
        vm.departments = res.data.data;
      });
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
      .withOption ( 'bFilter', true)
      .withOption('order', [
        [3, 'desc']
      ]);

    vm.dtColumns = [
      DTColumnBuilder.newColumn(null).withTitle('#').withOption('width', '20px').notSortable().renderWith(function(data, type, full, meta) {
        return meta.row + meta.settings.oAjaxData.start + 1;
      }),
      DTColumnBuilder.newColumn(null).withTitle('进修班').renderWith(nameHtml).notSortable(),
      DTColumnBuilder.newColumn('department.data.name').withTitle('科室部门').notSortable(),
      DTColumnBuilder.newColumn('application_deadline').withTitle('截止日期').renderWith(function(data) {
        return moment(data).format('YYYY-MM-DD');
      }).notSortable(),
      DTColumnBuilder.newColumn('announcement_date').withTitle('发榜日期').renderWith(function(data) {
        return moment(data).format('YYYY-MM-DD');
      }).notSortable(),
      DTColumnBuilder.newColumn('period').withTitle('进修时间').notSortable(),
      DTColumnBuilder.newColumn('fee').withTitle('费用').notSortable(),
      DTColumnBuilder.newColumn('student_range').withTitle('招生人数').notSortable(),
      DTColumnBuilder.newColumn('applier_count').withTitle('申请').notSortable(),
      DTColumnBuilder.newColumn('student_count').withTitle('学员').notSortable(),
      DTColumnBuilder.newColumn(null).withTitle('操作').notSortable()
      .renderWith(actionsHtml)
    ];

    vm.dtInstance = {};
  }

  function dtAjax(data, callback, settings) {
    var params = convertDtData(data);
    params['status'] = vm.status;
    params['include'] = 'department';
    angular.extend(params,vm.filter);
    angular.extend(params,vm.filter);
    if(vm.status == 'published'){
      CourseService.list(params)
        .then(function(res) {
          callback(convertDtResponse(res.data));
        });
    }else {
      CourseService.pending(params)
        .then(function(res) {
          callback(convertDtResponse(res.data));
        });
    }

  }

  function nameHtml(data,type,full,meta) {
    return '<a ui-sref="admin.courses.show({courseId: ' + full.id + '})"> '+ full.name + '</a>'
  }
  function actionsHtml(data, type, full, meta) {
    vm.courses[full.id] = full;
    var html =
      '<button class="btn btn-white btn-xs" uib-tooltip="编辑" ui-sref="admin.courses.edit({courseId: ' + data.id + ',status: '+ vm.status + '})">' +
      '   <i class="fa fa-fw fa-edit"></i>';

    if (!full.published_at) {
      html += '<button class="btn btn-white btn-xs" uib-tooltip="发布" ng-click="vm.publish(' + data.id + ')">' +
        '   <i class="fa fa-fw fa-paper-plane-o"></i>' +
        '</button>&nbsp;' +
        '<button class="btn btn-white btn-xs" uib-tooltip="复制" ui-sref="admin.courses.copy({courseId: ' + data.id + '})">' +
        '<i class="fa fa-files-o" aria-hidden="true"></i>' +
        '</button>&nbsp;';
    }

    if (full.published_at) {
      html +=
        '<button class="btn btn-white btn-xs" uib-tooltip="取消发布" ng-click="vm.unPublish(' + data.id + ')">' +
        '   <i class="fa fa-fw fa-undo"></i>' +
        '</button>&nbsp;' +
        '<button class="btn btn-white btn-xs" uib-tooltip="复制" ui-sref="admin.courses.copy({courseId: ' + data.id + '})">' +
        '<i class="fa fa-files-o" aria-hidden="true"></i>' +
        '</button>&nbsp;'
    }

    return html;
  }

  function statusHtml(data, type, full, meta) {
    var statusDescr = {
      canceled: '已取消',
      pending: '待审核',
      publish: '报名中',
      ongoing: '上课中',
      closed: '已结束'
    };
    return statusDescr[data];
  }

  function publish(id) {
    CourseService
      .publish(id)
      .then(function (res) {
        toaster.pop('success','发布成功');
        vm.dtInstance.reloadData(null, false);
      })
  }

  function unPublish(id) {
    CourseService
      .unPublish(id)
      .then(function (res) {
        toaster.pop('success','发布已取消');
        vm.dtInstance.reloadData(null, false);
      })
  }

  function createdRow(row, data, dataIndex) {
    // Recompiling so we can bind Angular directive to the DT
    $compile(angular.element(row).contents())($scope);
  }

}
