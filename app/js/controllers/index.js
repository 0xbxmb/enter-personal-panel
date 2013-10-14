/**
 * Created by i.sungurov on 02.10.13.
 */


personalPanel.controller('IndexCtrl', function ($rootScope, $scope, $location, $log, wamp, ticket, notifier) {

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
});