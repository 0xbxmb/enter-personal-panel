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

/*    advertisement.trackAdvertisment(function (data) {
        $rootScope.advertisements = data;
    }, function (error) {
        notifier.errors.currentMessage = error.desc;
    });*/

    $rootScope.advertisements = [
        {
            type: 1,
            source: "http://media02.hongkiat.com/creative-ads/mm.jpg"
        },
        {
            type: 1,
            source: "http://media02.hongkiat.com/creative-ads/fedex.jpg"
        },
        {
            type: 2,
            source: "http://video-js.zencoder.com/oceans-clip.mp4"
        }
    ];

    state.trackState(function (data) {

        var
            turnOff = 0,
            turnOn = 1;

        $scope.isTurnedOff = (data === turnOff);

    }, function (error) {

        notifier.errors.currentMessage = error.desc;

    });
});