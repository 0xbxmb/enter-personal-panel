/**
 * Created by i.sungurov on 15.10.13.
 */

personalPanel.factory('timeFunctions', [

    "$timeout",

    function timeFunctions($timeout) {

        "use strict";

        var
            intervals = {},
            intervalUID = 1;

        return {

            $setInterval: function (operation, interval, $scope) {

                var internalId = (intervalUID += 1);

                intervals[internalId] = $timeout(function intervalOperation() {
                    operation($scope || undefined);
                    intervals[internalId] = $timeout(intervalOperation, interval);
                }, interval);

                return internalId;
            },

            $clearInterval: function (id) {
                return $timeout.cancel(intervals[id]);
            }
        };
    }
]);