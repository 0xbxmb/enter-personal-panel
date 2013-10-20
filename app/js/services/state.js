/**
 * Created by i.sungurov on 16.10.13.
 */

personalPanel.service("state", function (wamp, STATE_NOTIFICATION_URL) {

    "use strict";

    var
        trackState = function (event) {
            wamp.subscribe(STATE_NOTIFICATION_URL, event);
        },
        notTrackState = function () {
            wamp.unsubscribe(STATE_NOTIFICATION_URL);
        };

    return {
        trackState: trackState,
        notTrackState: notTrackState
    };
});