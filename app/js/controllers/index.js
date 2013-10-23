/**
 * Created by i.sungurov on 02.10.13.
 */

personalPanel.controller('IndexCtrl', function ($rootScope, $scope, $location, $log, wamp, ticket, state, advertisement, notifier) {

    'use strict';

    $rootScope.$on("wampConnected", function (session) {
        notifier.connection.isConnected = true;
    });

    $rootScope.$on("wampDisconnected", function (rejectObject) {
        notifier.connection.isConnected = false;
        $rootScope.data = null;
    });

    ticket.trackTicket(function (data) {
        $rootScope.data = data;
    }, function (error) {
        notifier.errors.currentMessage = error.desc;
    });

    $rootScope.advertisements = [];
    advertisement.trackAdvertisement(function (data) {
        $rootScope.advertisements = data;
    }, function (error) {
        notifier.errors.currentMessage = error.desc;
    });

    state.trackState(function (data) {
        var
            turnOff = 0,
            turnOn = 1;
        $scope.isTurnedOff = (data === turnOff);
    }, function (error) {
        notifier.errors.currentMessage = error.desc;
    });
});