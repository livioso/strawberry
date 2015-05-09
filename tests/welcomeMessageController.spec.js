describe('Welcome Message Controller', function() {
  'use strict';

  var $controller;

  beforeEach(module('strawberry'));

  beforeEach(inject(function(_$controller_) {
    this.scope = {};
    this.scope.welcomeUser = '';
    $controller = _$controller_;

    $controller('WelcomeMessageController', {
      $scope: this.scope
    });
  }));
});
