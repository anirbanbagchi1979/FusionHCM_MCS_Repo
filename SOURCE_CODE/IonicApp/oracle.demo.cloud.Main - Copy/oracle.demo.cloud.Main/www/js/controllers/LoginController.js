//Direct API function chaing style.
//Concise and efficient, but perhaps slightly poor readability.
angular.module('css.controllers')

    .controller('LoginController', function ($scope, $ionicModal, $timeout,
                                             $ionicPopover, $ionicHistory, UserAuthService) {
        // Form data for the login modal
        $scope.loginData = {};

        // Create the login modal that we will use later
        $ionicModal.fromTemplateUrl('templates/login.html', {
            scope: $scope,
            animation: 'slide-in'

        }).then(function (modal) {
            $scope.modal = modal;
        });

        $scope.message = '';

        $scope.user = {
            username: null,
            password: null
        };

        $scope.login = function () {
            UserAuthService.login($scope.user.username, $scope.user.password);
        };

        $scope.logout = function () {
            UserAuthService.logout();

        };

        // Triggered in the login modal to close it
        $scope.closeLogin = function () {
            $scope.modal.hide();
        };

        $scope.$on('event:auth-loginRequired', function (e, rejection) {
            $scope.modal.show();
        });

        $scope.$on('event:auth-loginConfirmed', function () {
            $scope.username = null;
            $scope.password = null;
            $scope.modal.hide();

        });

        $scope.$on('event:auth-login-failed', function (e, status) {
            //console.log(status);
            var error = "Login failed.";
            console.log(status);
            if (status == 401) {
                error = "Invalid Credentials ";
            }

            if (status == 403) {
                error = "Access Denied";
            }

            $scope.message = error;

        });

    })
