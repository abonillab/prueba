'use strict';

angular.module('accountOpenningFrontendApp')
  .config(function($routeProvider) {

    $routeProvider
      .when('/', {
         templateUrl: 'views/welcome.html',
         controller: 'MainController'
      })
      .when('/identity_number', {
         templateUrl: 'views/identity.template.html',
         controller: 'MainController'
      })
      .when('/expeditionDate', {
          templateUrl: 'views/expedition-date.template.html',
          controller:'MainController'
      })
      .when('/expeditionCity', {
          templateUrl: 'views/expedition-city.template.html',
          controller:'MainController'
      })
      .when('/birthDate', {
          templateUrl: 'views/birth-date.template.html',
          controller:'MainController'
      })
      .when('/city',{
          templateUrl: 'views/city.template.html',
          controller:'MainController'
      })
      .when('/first-name', {
          templateUrl: 'components/basic_information/first-name.html',
          controller:'BasicInformationController'
      })
      .when('/totalAssets',{
          templateUrl:'components/financial_information/totalAssets.html',
           controller: 'MainController'
      })
      .when('/totalDebts',{
          templateUrl:'components/financial_information/totalDebts.html',
          controller: 'MainController'
      })
      .when('/monthlyIncome',{
          templateUrl:'components/financial_information/monthlyIncome.html',
          controller: 'MainController'
      })
      .when('/monthlyOutcome',{
          templateUrl:'components/financial_information/monthlyOutcome.html',
          controller: 'MainController'
      })
      .when('/foreign-income',{
          templateUrl:'views/foreign-income.template.html',
          controller: 'MainController'
      })
      .when('/usa-long-time-visitor',{
          templateUrl:'views/usa-long-time-visitor.template.html',
          controller: 'MainController'
      })
      .when('/assets-declaration',{
          templateUrl:'views/assets-declaration.template.html',
          controller: 'MainController'
      })
     .when('/assets-declaration',{
          templateUrl:'views/assets-declaration.template.html',
          controller: 'MainController'
      })
     .when('/usa-properties',{
          templateUrl:'views/usa-properties.template.html',
          controller: 'MainController'
      })
     .when('/confirm',{
          templateUrl:'components/confirm-account/confirm-account.html',
          controller: 'MainController'
      })
      .when('/green-card',{
          templateUrl:'views/green-card.template.html',
          controller: 'MainController'
      })
      .when('/finish', {
         templateUrl: 'views/finish.html',
         controller: 'MainController'
      })
      .when('/account', {
         templateUrl: 'components/account/account.template.html',
         controller: 'AccountController'
      }).when('/middle_name', {
          templateUrl: 'components/basic_information/middle_name.html',
          controller:'BasicInformationController'
      }).when('/last_name', {
          templateUrl: 'components/basic_information/last_name.html',
          controller:'BasicInformationController'
      }).when('/second_last_name', {
          templateUrl: 'components/basic_information/second_last_name.html',
          controller:'BasicInformationController'
      }).when('/gender', {
          templateUrl: 'components/basic_information/gender.html',
          controller:'BasicInformationController'
      })
       .when('/occupation', {
         templateUrl: 'components/occupation/occupation.template.html',
         controller: 'OccupationController'
      })
        .when('/mainActivity', {
         templateUrl: 'components/occupation/mainActivity.template.html',
         controller: 'OccupationController'
      })
         .when('/companyName', {
         templateUrl: 'components/occupation/companyName.template.html',
         controller: 'OccupationController'
      })
        .when('/companyCity', {
         templateUrl: 'components/occupation/companyCity.template.html',
         controller: 'OccupationController'
      })
         .when('/companyPhone', {
         templateUrl: 'components/occupation/companyPhone.template.html',
         controller: 'OccupationController'
      })
      .when('/contact', {
         templateUrl: 'components/contact/contact.template.html',
         controller: 'ContactController'
      })
      .when('/cellphone', {
         templateUrl: 'components/contact/celular.template.html',
         controller: 'ContactController'
      })
      .when('/borncity', {
         templateUrl: 'components/contact/ciudad.template.html',
         controller: 'ContactController'
      })
      .when('/email', {
         templateUrl: 'components/contact/mail.template.html',
         controller: 'ContactController'
      })
      .when('/create-bank-account', {
         templateUrl: 'views/loading.template.html',
         controller: 'CreateBankAccountController'
      })
      .when('/verify-prepopulated-information', {
         templateUrl: 'views/verify-prepopulated-information.template.html',
         controller: 'MainController'
      })
      .otherwise({
         templateUrl: 'views/welcome.html'
      })
  })
