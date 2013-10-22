/**
 * Created by i.sungurov on 17.10.13.
 */

personalPanel.directive("carousel", function ($timeout) {

    "use strict";

    var
        templateUrl = "templates/carousel.html",
        replace = true,
        restrict = 'E',
        scope = {
            delay: "=",
            isActive: "=",
            items: "=",
            itemAction: "=",
            itemTemplateUrl: "@"
        },

        link = function ($scope, iElement, iAttrs) {


            $scope.itemTemplateUrl = iAttrs.itemTemplateUrl;

            $scope.run = function (operation, delay) {
                $scope.stop = $timeout(function () {
                    if (!$scope.isStopped()) {
                        operation();
                        $scope.run(operation, delay);
                    } else {
                        $timeout.cancel($scope.stop);
                    }
                }, delay);
            };

            $scope.isStopped = function () {
                return $scope.isActive !== true;
            };

            $scope.showNextItem = function ($scope) {
                if ($scope.items && $scope.items.length) {
                    $scope.currentItem = $scope.items[$scope.itemIndex];
                    if ($scope.itemIndex < $scope.items.length - 1) {
                        $scope.itemIndex += 1;
                    } else {
                        $scope.itemIndex = 0;
                    }
                } else {
                    $scope.currentItem = null;
                }
            };

            $scope.$watch("items.length", function (data) {
                if (data > 0 && !$scope.isStopped()) {
                    $scope.start();
                } else {
                    $scope.pause();
                }
            });

            $scope.$watch("isActive", function (data) {
                if (data && $scope.items.length) {
                    $scope.resume();
                } else {
                    $scope.pause();
                }
            });

            $scope.carousel = function (skipShowNext) {
                $timeout.cancel($scope.stop);
                $scope.isActive = true;
                if (!skipShowNext) {
                    $scope.showNextItem($scope);
                }
                $scope.run(function () {
                    $scope.showNextItem($scope);
                }, $scope.delay * 1000);
            };

            $scope.start = function () {
                $scope.itemIndex = 0;
                $scope.carousel();
            };

            $scope.resume = function () {
                $scope.carousel(true);
            };

            $scope.pause = function () {
                if (!$scope.isStopped()) {
                    $scope.isActive = false;
                    $timeout.cancel($scope.stop);
                }
            };

        };

    return {
        templateUrl: templateUrl,
        replace: replace,
        restrict: restrict,
        scope: scope,
        link: link
    };
});