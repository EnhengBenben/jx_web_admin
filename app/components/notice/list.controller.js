(function() {
  'use strict';

  angular
    .module('merchantApp')
    .controller('NoticeListController', NoticeListController);

  NoticeListController.$inject = ['$compile', '$scope', '$stateParams', 'toaster', 'NoticeService', 'DTOptionsBuilder', 'DTColumnBuilder', '$uibModal'];

  /* @ngInject */
  function NoticeListController($compile, $scope, $stateParams, toaster, NoticeService, DTOptionsBuilder, DTColumnBuilder, $uibModal) {
    var vm = this;
    vm.status = $stateParams.status;
    vm.notices = {};
    vm.publish = publish;
    vm.unpublish = unpublish;
    vm.remove = remove;
    vm.top = top;
    vm.down = down;
    vm.statistics = statistics;
    vm.exportAll = exportAll;
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
        .withOption('order', [[2, 'desc']]);

      vm.dtColumns = [
        DTColumnBuilder.newColumn(null).withTitle('#').withOption('width','25px').notSortable().renderWith(function(data, type, full, meta) {
          return meta.row + meta.settings.oAjaxData.start + 1;
        }),
        DTColumnBuilder.newColumn(null).withTitle('标题').renderWith(nameHtml),
        DTColumnBuilder.newColumn('created_at').withTitle('添加时间').withOption('width','150px').renderWith(function(data) {
          return moment(data).format('YYYY-MM-DD');
        }),
        DTColumnBuilder.newColumn(null).withTitle('操作').withOption('width','150px').notSortable().renderWith(actionsHtml)
      ];

      vm.dtInstance = {};
    }

    function dtAjax(data, callback, settings) {
      var params = convertDtData(data);
      params['status'] = vm.status;
      if(vm.status == "publish"){
        NoticeService.list(params)
          .then(function(res) {
            callback(convertDtResponse(res.data));
          });
      }else {
        NoticeService.pending(params)
          .then(function(res) {
            callback(convertDtResponse(res.data));
          });
      }
    }

    function nameHtml(data, type, full, meta) {
      return '<a ui-sref="admin.notices.show({noticeId: ' + full.id + '})"> '+ full.name + '</a>'
    }

    function actionsHtml(data, type, full, meta) {
      vm.notices[full.id] = full;
      var html =
        '<button class="btn btn-white btn-xs" uib-tooltip="编辑" ui-sref="admin.notices.edit({noticeId: ' + full.id + '})">' +
        '   <i class="fa fa-fw fa-edit"></i>' +
        '</button>&nbsp;';

      if (vm.status === 'pending') {
        html += '<button class="btn btn-white btn-xs" uib-tooltip="发布" ng-click="vm.publish(' + full.id + ')">' +
          '   <i class="fa fa-fw fa-paper-plane-o"></i>' +
          '</button>&nbsp;';
      }
      if (vm.status === 'publish') {
        html +=
            '<button class="btn btn-white btn-xs" uib-tooltip="置顶" ng-click="vm.top(' + full['id'] + ')" ng-if="'+ !data.top +'">' +
            ' <i class="fa fa-arrow-circle-up"></i>' +
            '</button>&nbsp;' +
            '<button class="btn btn-white btn-xs" uib-tooltip="取消置顶" ng-click="vm.down(' + full['id'] + ')" ng-if="'+ data.top +'">' +
            ' <i class="fa fa-arrow-circle-down"></i>' +
            '</button>&nbsp;' +
            '<button class="btn btn-white btn-xs" uib-tooltip="取消发布" ng-click="vm.unpublish(' + full.id + ')">' +
            '   <i class="fa fa-fw fa-undo"></i>' +
            '</button>&nbsp;';
      }
      html +=
        '<button class="btn btn-white btn-xs" uib-tooltip="删除" confirm="确定删除该通知吗？" ng-click="vm.remove(' + full.id + ')">' +
        '   <i class="fa fa-fw fa-trash-o"></i>' +
        '</button>&nbsp;';

      return html;
    }

    function createdRow(row, data, dataIndex) {
      // Recompiling so we can bind Angular directive to the DT
      $compile(angular.element(row).contents())($scope);
    }

    function publish(noticeId) {
      NoticeService
        .publish(noticeId)
        .then(function(res) {
          toaster.pop('success', '发布成功');
          vm.dtInstance.reloadData(null, false);
        });
    }

    function unpublish(noticeId) {
      NoticeService
        .unpublish(noticeId)
        .then(function(res) {
          toaster.pop('success', '取消发布成功');
          vm.dtInstance.reloadData(null, false);
        });
    }

    function remove(noticeId) {
      NoticeService
        .remove(noticeId)
        .then(function() {
          vm.dtInstance.reloadData(null, false);
        });
    }

    function top(id) {
      NoticeService
        .top(id)
        .then(function (res) {
          toaster.pop('success','成功置顶');
          vm.dtInstance.reloadData(null, false);
        })
    }
    function down(id) {
      NoticeService
        .down(id)
        .then(function (res) {
          toaster.pop('success','置顶已取消');
          vm.dtInstance.reloadData(null, false);
        })
    }

    function statistics(noticeId) {

    }

    function exportAll() {
      vm.exporting = true;
      NoticeService
        .exportAll({
          status: vm.status
        }).then(function() {
          vm.exporting = false;
        }, function() {
          vm.exporting = false;
        });
    }
  }
})();
