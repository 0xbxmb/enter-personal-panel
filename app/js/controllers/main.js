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

            var video = 2;

            if ($scope && $scope.currentItem &&
                $scope.currentItem.type === video) {

                $scope.pause();

                 _V_("video", {"autoplay": true, "controls": false},
                    function () {
                        this.on("ended", function () {
                            $scope.resume(true);
                        });
                    }).src([
                    { type: "video/mp4", src: $scope.currentItem.mp4 },
                    { type: "video/webm", src:  $scope.currentItem.webm },
                    { type: "video/ogg", src:  $scope.currentItem.ogv }
                ]).play();

            }
        },

        applyTicketChanges = function (tickets) {
            if (tickets) {

                if (tickets.length) {

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

                            if (!isInArray && isActual(tickets[i])) {               // Появился "новый"  - добавим его.
                                $scope.ticketCarousel.items.unshift(tickets[i]);    // Вставлять в начало списка
                            }
                        }
                    }
                    //Опредеояем состояния
                    $scope.ticketCarousel.active = ($scope.ticketCarousel.items.length > 0);
                    $scope.advertisementCarousel.active = !$scope.ticketCarousel.active && $scope.settings.showAdvertisement.value;

                } else {

                    $scope.advertisementCarousel.active = true;

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
        active: false,
        delay: $scope.settings.refreshTimeOut.value,
        itemAction: isActual
    };

    $scope.advertisementCarousel = {
        items: $rootScope.advertisements,
        active: false,
        delay: $scope.settings.refreshTimeOut.value,
        itemAction: advertisementAction
    };
});