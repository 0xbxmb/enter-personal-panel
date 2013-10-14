/**
 * Created by i.sungurov on 04.10.13.
 */

personalPanel.controller('SettingsCtrl', function ($rootScope, $scope, $log, $location, settings, notifier) {

    'use strict';

    $scope.isNotLogged = true;
    $scope.loginErrorMessage = null;

    var isConnected = notifier.connection.isConnected;
    notifier.connection.isConnected = true;

    /*На случай, если во время того, как мы находимся в настройках произошло отключение,
     а нам не нужно восстановить состояние по щелчку на кнопке отмена.*/
    $rootScope.$on('wampReconnected', function () {
        notifier.connection.isConnected = true;
        isConnected = true;
    });
    $rootScope.$on('wampConnected', function () {
        notifier.connection.isConnected = true;
        isConnected = true;
    });
    $rootScope.$on('wampDisconnected', function () {
        notifier.connection.isConnected = true;
        isConnected = false;
    });

    $scope.logon = function () {

        $scope.loginErrorMessage = null;

        if ($scope.login ===  settings.login &&
            $scope.password === settings.password) {

            $scope.isNotLogged = false;

            $scope.workPlaceId = settings.settings.clientId;
            $scope.serverAddress = settings.settings.wampServerUrl;

        } else {
            $scope.loginErrorMessage = "Неверный пароль или пользователя";
        }
    };

    $scope.apply = function () {
        settings.applyNewSettings({
            workPlaceId : $scope.workPlaceId,
            serverAddress: $scope.serverAddress
        });

        $rootScope.$on('$routeChangeStart', function (data) {
            location.reload();
        });

        $location.path("/main");
    };

    $scope.cancel = function () {
        $location.path("/main");
        notifier.connection.isConnected = isConnected;
    };
});
