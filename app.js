(function () {
  "use strict";

  var app = angular.module('app', []);

  app.controller('App', App);

  function App($scope) {
    $scope.message = "Hello, World!";
    $scope.date = '2001-01-09';

  }

  app.directive('selectDate', selectDate);


  function selectDate() {
    return {
      restrict: 'E',
      templateUrl: '/select-date.html',
      link: link,
      scope: {
        date: '='
      }
    };

    function link(scope, element, attributes) {

      var dayElement = document.querySelector('[name="day"]');
      var monthElement = document.querySelector('[name="month"]');
      var yearElement = document.querySelector('[name="year"]');

      var watcher = scope.$watch('date', updateSelects);

      function updateModel() {
        var day = $(dayElement).val();
        var month = $(monthElement).val();
        var year = $(yearElement).val();

        if (day && month && year) {
          watcher();

          scope.date = day + '-' + month + '-' + year;
          scope.$apply();

          watcher = scope.$watch('date', updateSelects);
        }
      }

      function updateSelects(date) {
        if (date && date.length === 10) {
          $(dayElement).val(date.substr(8, 2));
          $(monthElement).val(date.substr(5, 2));
          $(yearElement).val(date.substr(0, 4));
        }

      }

      function bind() {
        $(dayElement).bind('change', updateModel);
        $(monthElement).bind('change', updateModel);
        $(yearElement).bind('change', updateModel);
      }

      scope.label = attributes.label;

      // days
      var html = '<option value=""></option>';

      for (var day = 1; day < 32; day++) {

        var value = day < 10 ? "0" + day : day;

        html += '<option value="' + value + '">' + day + '</option>';
      }

      dayElement.innerHTML = html;

      var monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
      ];

      html = '<option value=""></option>';

      for (var month = 1; month < 13; month++) {
        var value = month < 10 ? "0" + month : month;

        html += '<option value="' + value + '">' + monthNames[month - 1] + '</option>';
      }

      monthElement.innerHTML = html;

      html = '<option value=""></option>';

      for (var year = 2000; year < 2016; year++) {

        html += '<option value="' + year + '">' + year + '</option>';
      }

      yearElement.innerHTML = html;

      updateSelects(scope.date);

      bind();
    }
  }

}());
