/**
 * Created by i.sungurov on 17.10.13.
 */


personalPanel.service('advertisement', function (wamp, ADVERTISEMENT_URL) {

    "use strict";

    var
        trackAdvertisement = function (event) {
            wamp.subscribe(ADVERTISEMENT_URL, event);
        },
        notTrackAdvertisement = function () {
            wamp.unsubscribe(ADVERTISEMENT_URL);
        };

    return {
        trackAdvertisement: trackAdvertisement,
        notTrackAdvertisement: notTrackAdvertisement
    };
});