/**
 * Created by i.sungurov on 02.10.13.
 */

personalPanel.controller('MainCtrl', function ($rootScope, $scope, $log, $location, $window, ticket, notifier) {

    'use strict';

    $rootScope.$watch("data", function (data) {
        if (data && data.length > 0) {
            $scope.ticketProduct = data[0];
        } else {
            $scope.ticketProduct = null;
        }
    }, function (error) {
        notifier.errors.currentMessage = error.desc;
    });

    $scope.isActual = function (ticketProduct) {
        var
            invited = 4,
            operating = 5;

        if (!ticketProduct) {
            return false;
        }

        return ((ticketProduct.State === invited) || (ticketProduct.State === operating));
    };


    $('#bigtext').bigtext();

});