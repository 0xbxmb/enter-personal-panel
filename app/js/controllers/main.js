/**
 * Created by i.sungurov on 02.10.13.
 */

personalPanel.controller('MainCtrl', function ($rootScope, $scope, $log, $location, $timeout, $window,
                                               settings, ticket, notifier) {

    'use strict';

    var
        isActual = function (ticketProduct) {
            var
                invited = 4,
                operating = 5;

            if (!ticketProduct) {
                return false;
            }

            return ((ticketProduct.State === invited)
                 || (ticketProduct.State === operating));
        },

        advertisementAction = function ($scope) {
//            advertisement, timeFunctions, timer
            if ($scope.advertisement && $scope.advertisement.type === 2) {

                $scope.pause($scope);

                _V_("video1", {
                    "controls": false,
                    "autoplay": true,
                    "preload": "auto"
                }, function () {
                    $scope.pause($scope);
                    debugger;
                });
            }
        },

        applyTicketChanges = function (tickets) {

            if (tickets && tickets.length) {

                var
                    i, pos,
                    isInArray;

                for (i = 0; i < tickets.length; i += 1) {

                    isInArray = _.any($scope.ticketCarousel.items, function (item) {
                        return item.Id === tickets[i].Id;
                    });

                    if (isInArray && !isActual(tickets[i])) {     // Ушел из обработки - удаляем из очереди.

                        _.find($scope.ticketCarousel.items, function (item, index) {
                            if (item.Id === tickets[i].Id) {
                                pos = index;
                                return true;
                            }
                            return false;
                        });

                        $scope.ticketCarousel.items.splice(pos, 1);
                    } else {

                        if (!isInArray && isActual(tickets[i])) {  // Появился "новый"  - добавим его.
                            $scope.ticketCarousel.items.unshift(tickets[i]);    // Вставлять в начало списка
                        }

                    }
                }
            }
        };

    $rootScope.$watch("data", applyTicketChanges,
        function (error) {
            notifier.errors.currentMessage = error.desc;
        });

    $scope.settings = settings.settings;

    $scope.ticketCarousel = {
        items: [],
        active: true,
        delay: $scope.settings.refreshTimeOut.value,
        itemAction: isActual
    };

    $scope.advertisementCarousel = {
        items: $rootScope.advertisements,
        active: true,
        delay: $scope.settings.refreshTimeOut.value,
        itemAction: advertisementAction
    };

});