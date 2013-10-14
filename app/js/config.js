/**
 * Created by i.sungurov on 02.10.13.
 */

personalPanel.config(['$routeProvider', function ($routeProvider) {

    'use strict';

    $routeProvider.when(
        '/',
        {
            redirectTo: "/main"
        }
    );

    $routeProvider.when(
        '/settings',
        {
            templateUrl: 'partials/settings.html',
            controller: 'SettingsCtrl'
        }
    );

    $routeProvider.when(
        '/main',
        {
            templateUrl: 'partials/main.html',
            controller: 'MainCtrl'
        }
    );

    $routeProvider.otherwise(
        {
            redirectTo: "/main"
        }
    );

}])

    .constant('SEND_ID_URL', 'http://enter.local/client/sendid')
    .constant('TICKET_CHANGES_NOTIFICATIONS_URL', 'http://enter.local/tickets/notifications');

