/**
 * Created by i.sungurov on 03.10.13.
 */

personalPanel.service('ticket', function ($q, $log, $rootScope, wamp, TICKET_CHANGES_NOTIFICATIONS_URL) {

    'use strict';

    var
        trackTicket = function (onEvent) {
            wamp.subscribe(TICKET_CHANGES_NOTIFICATIONS_URL, onEvent);
        },

        notTrackTicket = function () {
            wamp.unsubscribe(TICKET_CHANGES_NOTIFICATIONS_URL);
        };

    return {
        trackTicket: trackTicket,
        notTrackTicket: notTrackTicket
    };
});