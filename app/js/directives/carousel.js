/**
 * Created by i.sungurov on 17.10.13.
 */

personalPanel.directive("carousel", function (timeFunctions) {

    "use strict";

    var
        templateUrl = "templates/carousel.html",
        replace = true,
        restrict = 'E',

        itemIndex = 0,

        scope = {
            delay: "=",
            isActive: "=",
            items: "=",
            itemAction: "=",
            itemTemplateUrl: "@"
        },

        getCurrentIndex = function () {
            return itemIndex;
        },

        resume = function ($scope) {
            if (!$scope) {
                return;
            }
            $scope.timer = timeFunctions.$setInterval(function ($scope) {
                if ($scope.items && $scope.items.length) {
                    if (itemIndex < $scope.items.length) {
                        $scope.currentItem = $scope.items[itemIndex];
                        itemIndex += 1;
                    } else {
                        itemIndex = 0;
                    }
                }
            }, $scope.delay * 1000, $scope);
        },

        start = function ($scope) {
            itemIndex = 0;
            resume();
        },

        pause = function ($scope) {
            if ($scope.timer) {
                timeFunctions.$clearInterval($scope.timer);
            }
        },

        link = function ($scope, iElement, iAttrs) {

            $scope.isActive = $scope.$eval(iAttrs.isActive);
            $scope.itemTemplateUrl = iAttrs.itemTemplateUrl;

            $scope.timeFunctions = timeFunctions;

            $scope.start = start;
            $scope.pause = pause;

            $scope.$watch("items", function (data) {
                if ($scope.isActive) {
                    if ($scope.timer) {
                        timeFunctions.$clearInterval($scope.timer);
                    }
                    start($scope);
                }
            });

            $scope.$watch("items.length", function (data) {
                if ($scope.isActive) {
                    if ($scope.timer) {
                        timeFunctions.$clearInterval($scope.timer);
                    }
                    start($scope);
                }
            });

            $scope.$watch("isActive", function (data) {
                if (!data && $scope.timer) {
                    timeFunctions.$clearInterval($scope.timer);
                } else {
                    start($scope);
                }
            });
        };

    return {
        templateUrl: templateUrl,
        replace: replace,
        restrict: restrict,
        scope: scope,
        link: link
    };
});