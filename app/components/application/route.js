/**
 * Created by yong on 16/5/7.
 */
(function() {
  'use strict';

  angular
    .module('merchantApp')
    .config(function($stateProvider, $urlRouterProvider) {
      // 申请
      $stateProvider.state('admin.application', {
          url: '/application',
          abstract: true,
          templateUrl: 'components/application/layout.html'
        })
        .state('admin.application.list', {
          url: '/list',
          templateUrl: 'components/application/list.html',
          controller: 'applicationListController as vm'
        })
        .state('showImg', {
          url: '/application/table?url',
          templateUrl: 'components/application/application-table.html',
          controller: 'ApplicationShowTableController as vm'
        })
      //申请设置
      $stateProvider.state('admin.application.settings', {
        url: '/settings',
        abstract: true,
        templateUrl: 'components/application/settings/layout.html'
      });
      //职称设置
      $stateProvider.state('admin.application.settings.professional', {
          url: '/professional',
          abstract: true,
          templateUrl: 'components/application/settings/professional/layout.html'
        })
        .state('admin.application.settings.professional.list',{
          url:'/list',
          templateUrl:'components/application/settings/professional/list.html',
          controller: 'ApplicationProfessionalListController as vm'
        })
        .state('admin.application.professionalCreate',{
          url:'/professional/create',
          templateUrl:'components/application/settings/professional/create.html',
          controller: 'ApplicationProfessionalCreateController as vm'
        })
      .state('admin.application.professionalEdit',{
        url:'/professional/edit/:id',
        templateUrl:'components/application/settings/professional/edit.html',
        controller: 'ApplicationProfessionalEditController as vm'
      });
        //区域设置
      $stateProvider.state('admin.application.settings.areas', {
          url: '/areas',
          abstract: true,
          templateUrl: 'components/application/settings/areas/layout.html'
        })
        .state('admin.application.settings.areas.list',{
          url:'/list',
          templateUrl:'components/application/settings/areas/list.html',
          controller: 'ApplicationAreasListController as vm'
        })
        .state('admin.application.areasCreate',{
          url:'/areas/create',
          templateUrl:'components/application/settings/areas/create.html',
          controller: 'ApplicationAreasCreateController as vm'
        })
        .state('admin.application.areasEdit',{
          url:'/areas/edit/:id',
          templateUrl:'components/application/settings/areas/edit.html',
          controller: 'ApplicationAreasEditController as vm'
        });
        //行政职务设置
      $stateProvider.state('admin.application.settings.duties', {
          url: '/duties',
          abstract: true,
          templateUrl: 'components/application/settings/duties/layout.html'
        })
        .state('admin.application.settings.duties.list',{
          url:'/list',
          templateUrl:'components/application/settings/duties/list.html',
          controller: 'ApplicationDutiesListController as vm'
        })
        .state('admin.application.dutiesCreate',{
          url:'/duties/create',
          templateUrl:'components/application/settings/duties/create.html',
          controller: 'ApplicationDutiesCreateController as vm'
        })
        .state('admin.application.dutiesEdit',{
          url:'/duties/edit/:id',
          templateUrl:'components/application/settings/duties/edit.html',
          controller: 'ApplicationDutiesEditController as vm'
        });
      //学历设置
      $stateProvider.state('admin.application.settings.education', {
          url: '/education',
          abstract: true,
          templateUrl: 'components/application/settings/education/layout.html'
        })
        .state('admin.application.settings.education.list',{
          url:'/list',
          templateUrl:'components/application/settings/education/list.html',
          controller: 'ApplicationEducationListController as vm'
        })
        .state('admin.application.educationCreate',{
          url:'/education/create',
          templateUrl:'components/application/settings/education/create.html',
          controller: 'ApplicationEducationCreateController as vm'
        })
        .state('admin.application.educationEdit',{
          url:'/education/edit/:id',
          templateUrl:'components/application/settings/education/edit.html',
          controller: 'ApplicationEducationEditController as vm'
        });
      //医院级别设置
      $stateProvider.state('admin.application.settings.hospital', {
          url: '/hospital',
          abstract: true,
          templateUrl: 'components/application/settings/hospital/layout.html'
        })
        .state('admin.application.settings.hospital.list',{
          url:'/list',
          templateUrl:'components/application/settings/hospital/list.html',
          controller: 'ApplicationHospitalListController as vm'
        })
        .state('admin.application.hospitalCreate',{
          url:'/hospital/create',
          templateUrl:'components/application/settings/hospital/create.html',
          controller: 'ApplicationHospitalCreateController as vm'
        })
        .state('admin.application.hospitalEdit',{
          url:'/hospital/edit/:id',
          templateUrl:'components/application/settings/hospital/edit.html',
          controller: 'ApplicationHospitalEditController as vm'
        });
    //其他设置
      $stateProvider.state('admin.application.settings.other', {
          url: '/other',
          abstract: true,
          templateUrl: 'components/application/settings/other/layout.html'
        })
        .state('admin.application.settings.other.list',{
          url:'/list',
          templateUrl:'components/application/settings/other/list.html',
          controller: 'ApplicationOtherListController as vm'
        })
    });
})();
