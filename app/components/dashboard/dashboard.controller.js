'use strict';

angular
  .module('merchantApp')
  .controller('DashboardController', DashboardController);

DashboardController.$inject = ['ExportService','ApplicationAdminService','ApplicationService','DashboardService','$compile', '$scope', '$stateParams', 'toaster', 'CourseService', 'DTOptionsBuilder', 'DTColumnBuilder', '$uibModal','$localStorage'];

function DashboardController(ExportService,ApplicationAdminService,ApplicationService,DashboardService,$compile, $scope, $stateParams, toaster, CourseService, DTOptionsBuilder, DTColumnBuilder, $uibModal,$localStorage) {
  var vm = this;
  vm.status = $stateParams.status;
  vm.$localStorage = $localStorage;
  vm.courses = {};
  vm.show = show;
  vm.download = download;
  vm.years = [];
  var y = (new Date()).getUTCFullYear() + 10;
  for (var i = 2010; i <= y; i += 1) {
    vm.years.push(i);
  }
  vm.filter = {
  };
  var params = {
    year:vm.filter.year,
    limit:1000
  };
  return init();

  function init() {

    $scope.$watch('vm.filter.year', function (newValue, oldValue) {
      if (newValue != oldValue) {
        var params = {
          year:vm.filter.year,
          limit:1000
        };
        ApplicationAdminService
          .courses(params)
          .then(function (res) {
            vm.courses = res.data.data;
          });
      }
    }, true);
    $scope.$watch('vm.filter.course', function (newValue, oldValue) {
      if (newValue != oldValue) {
        vm.appInstance.reloadData();
      }
    }, true);

    if(!vm.$localStorage.role){
      DashboardService
        .dashboard()
        .then(function (res) {
          vm.dashboard = res.data.data;
        });
    }else {
      ApplicationAdminService
        .courses(params)
        .then(function (res) {
          vm.courses = res.data.data;
        });
    }
    initDt();

    $scope.$watch('vm.filter', function(newValue, oldValue) {
      if (newValue != oldValue) {
        vm.dtInstance.reloadData();
      }
    }, true);
  }

  function initDt() {
    vm.appOptions = DTOptionsBuilder.newOptions()
      .withOption('ajax', appAjax)
      .withDataProp('data')
      .withOption('createdRow', createdAppRow)
      .withOption('order', [
        [7, 'desc']
      ]);

    vm.appColumns = [
      DTColumnBuilder.newColumn(null).withTitle('#').withOption('width', '20px').notSortable().renderWith(function(data, type, full, meta) {
        return meta.row + meta.settings.oAjaxData.start + 1;
      }).withOption('width','20px'),
      DTColumnBuilder.newColumn('user.data.name').withTitle('姓名').withOption('width','45px').renderWith(nameHtml),
      DTColumnBuilder.newColumn('user.data.orgRank.data.name').withTitle('单位级别').withOption('width','70px').notSortable(),
      DTColumnBuilder.newColumn('user.data.degree.data.name').withTitle('学历').withOption('width','30px').notSortable(),
      DTColumnBuilder.newColumn('user.data.techDuty.data.name').withTitle('职称').withOption('width','60px').notSortable(),
      DTColumnBuilder.newColumn('course.data.name').withTitle('进修班').notSortable(),
      DTColumnBuilder.newColumn('submitted_at').withTitle('申请时间').withOption('width','90px').renderWith(function(data,type,full,meta) {
        return moment(full.submitted_at).format('YYYY-MM-DD');
      }),
      DTColumnBuilder.newColumn('score').withTitle('积分').withOption('width','30px').notSortable(),
      DTColumnBuilder.newColumn('recommender').withTitle('推荐人').withOption('width','90px').notSortable(),
      DTColumnBuilder.newColumn('status').withTitle('状态').withOption('width','60px').notSortable(),
      DTColumnBuilder.newColumn(null).withTitle('操作').withOption('width','60px').notSortable()
        .renderWith(actionsHtml)
    ];

    vm.appInstance = {};

    vm.taOptions = DTOptionsBuilder.newOptions()
      .withOption('ajax', taAjax)
      .withDataProp('data')
      .withOption ( 'bLengthChange', false)
      .withOption ( 'bFilter', false)
      .withOption('bPaginate', false)
      .withOption('bInfo', false)
      .withOption('createdRow', createdtaRow)
      .withOption('order', [
        [8, 'desc']
      ]);
    vm.taColumns = [
      DTColumnBuilder.newColumn(null).withTitle('#').withOption('width', '20px').notSortable().renderWith(function(data, type, full, meta) {
        return meta.row + meta.settings.oAjaxData.start + 1;
      }).withOption('width','20px'),
      DTColumnBuilder.newColumn('user.data.name').withTitle('姓名').withOption('width','45px').renderWith(nameHtml),
      DTColumnBuilder.newColumn('user.data.orgRank.data.name').withTitle('单位级别').withOption('width','70px').notSortable(),
      DTColumnBuilder.newColumn('user.data.degree.data.name').withTitle('学历').withOption('width','30px').notSortable(),
      DTColumnBuilder.newColumn('user.data.techDuty.data.name').withTitle('职称').withOption('width','60px').notSortable(),
      DTColumnBuilder.newColumn('course.data.name').withTitle('进修班').notSortable(),
      DTColumnBuilder.newColumn('submitted_at').withTitle('申请时间').withOption('width','90px').renderWith(function(data,type,full,meta) {
        return moment(full.submitted_at).format('YYYY-MM-DD');
      }),
      DTColumnBuilder.newColumn('score').withTitle('积分').withOption('width','30px').notSortable(),
      DTColumnBuilder.newColumn('recommender').withTitle('推荐人').withOption('width','90px').notSortable(),
      DTColumnBuilder.newColumn('status').withTitle('状态').withOption('width','60px').notSortable(),
    ];

    vm.taInstance = {};
  }

  function taAjax(data, callback, settings) {
     var params = convertDtData(data);
    params['limit'] = 20;
    params['include'] = 'user.orgRank,user.techDuty,user.degree,course'
    ApplicationService.list(params)
      .then(function(res) {
        callback(convertDtResponse(res.data));
      });
  }
  function appAjax(data, callback, settings) {
    var params = convertDtData(data);
    params['include'] = 'user.orgRank,user.techDuty,user.degree,course';
    angular.extend(params,vm.filter);
    ApplicationAdminService
      .list(params)
      .then(function(res) {
        callback(convertDtResponse(res.data));
      });
  }

  function nameHtml(data, type, full, meta) {
    return '<a ng-click="vm.show('+ full.id +')">' + data + '</a>';
  }

  function actionsHtml(data, type, full, meta) {
    var html =
      '<button class="btn btn-white btn-xs" uib-tooltip="审核申请表" ng-click="vm.show('+ data.id +')">' +
      ' <i class="fa fa-check-square-o" aria-hidden="true"></i>' +
      '</button>&nbsp;' +
      '<button class="btn btn-white btn-xs" uib-tooltip="下载申请表" ng-click="vm.download('+ data.id +')">' +
      ' <i class="fa fa-download" aria-hidden="true"></i>' +
      '</button>&nbsp;';
    return html;
  }

  function createdtaRow(row, data, dataIndex) {
    // Recompiling so we can bind Angular directive to the DT
    $compile(angular.element(row).contents())($scope);
  }
  function createdAppRow(row, data, dataIndex) {
    // Recompiling so we can bind Angular directive to the DT
    $compile(angular.element(row).contents())($scope);
  }


  function download(id) {
    var params = {};
    ExportService
      .exportFile('/application/' + id + '/downloadApplication', "申请表",params,'GET')
      .then(function (res) {

      })
  }


  function show(id) {
    if(vm.$localStorage.role){
      var showTable = $uibModal.open({
        templateUrl:'components/department-admin/show.html',
        controller:'ApplicationAdminShowController',
        controllerAs: 'vm',
        bindToController: true,
        size:'lg',
        resolve:{
          showId:id
        }
      })
    }else {
      var showTable = $uibModal.open({
        templateUrl:'components/application/show.html',
        controller:'ApplicationShowController',
        controllerAs: 'vm',
        bindToController: true,
        size:'lg',
        resolve:{
          showId:id
        }
      })
    }

  }
}
