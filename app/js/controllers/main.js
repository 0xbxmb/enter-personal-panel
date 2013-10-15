/**
 * Created by i.sungurov on 02.10.13.
 */

personalPanel.controller('MainCtrl', function ($rootScope, $scope, $log, $location, $timeout, $window,
                                               settings, ticket, notifier, timeFunctions) {

    'use strict';

    var
        isActual = function (ticketProduct) {
            var
                invited = 4,
                operating = 5;

            if (!ticketProduct) {
                return false;
            }

            return ((ticketProduct.State === invited) || (ticketProduct.State === operating));
        },
        findById = function (tickets, ticket) {
            if (tickets && ticket) {
                var i;
                for (i = 0; i < tickets.length; i += 1) {
                    if (tickets[i].Id === ticket.Id) {
                        return i;
                    }
                }
            }
            return -1;
        },
        startCarousel = function () {

            timeFunctions.$setInterval(function ($scope) {

                var pos;

                if ($scope.tickets && $scope.tickets.length > 0) {

                    pos = findById($scope.tickets, $scope.ticketProduct);

                    if (pos < $scope.tickets.length - 1) {
                        $scope.ticketProduct = $scope.tickets[pos + 1];
                    } else {
                        $scope.ticketProduct = $scope.tickets[0];
                    }

                } else {
                    $scope.ticketProduct =  null;
                }

            }, settings.settings.refreshTimeOut, $scope);
        };

    $scope.tickets = [];

    $rootScope.$watch("data", function (data) {

        if (data && data.length > 0) {
            var
                i,
                pos,
                ticket,
                isInArray;

            for (i = 0; i < data.length; i += 1) {

                ticket = data[i];
                isInArray = _.any($scope.tickets, function (item) {
                    return item.Id === ticket.Id;
                });

                if (isInArray && !isActual(ticket)) { //Стал "не актуальным" - удаляем.

                    pos = findById($scope.tickets, ticket);
                    $scope.tickets.splice(pos, 1);

                    if ($scope.tickets[pos]) {
                        $scope.ticketProduct = $scope.tickets[pos];
                    } else {
                        if ($scope.tickets[pos - 1]) {
                            $scope.ticketProduct = $scope.tickets[pos - 1];
                        } else {
                            $scope.ticketProduct = null;
                        }
                    }

                } else {
                    if (!isInArray && isActual(ticket)) { // Появился "новый"  - добавим его.
                        $scope.tickets.push(ticket);
                        $scope.ticketProduct = ticket;
                    }
                }
            }
        }
    }, function (error) {
        notifier.errors.currentMessage = error.desc;
    });

    $scope.isActual = isActual;

    startCarousel();

});