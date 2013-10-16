/**
 * Created by i.sungurov on 10.10.13.
 */
personalPanel.service('settings', function (localStorageService) {

    "use strict";

    var
        DEFAULT_LOGIN = "admin",
        DEFAULT_PASSWORD = "1",

        DEFAULT_WAMP_SERVER_URL = "ws://test-zone.comintech.ru:81",
        DEFAULT_CLIENT_ID = "android1",

        wampServerLocalStorageKey = "panelWampServerUrl",
        clientIdLocalStorageKey = "panelClientId",



        settings = {
            wampServerUrl: null,
            clientId: null,
            refreshTimeOut: 10000
        },

        setDefaults = function () {
            settings.wampServerUrl = DEFAULT_WAMP_SERVER_URL;
            settings.clientId = DEFAULT_CLIENT_ID;
        },

        loadFromStorage = function () {

            settings.wampServerUrl = localStorageService.get(wampServerLocalStorageKey);
            settings.clientId = localStorageService.get(clientIdLocalStorageKey);

            if (!settings.wampServerUrl) {
                settings.wampServerUrl = DEFAULT_WAMP_SERVER_URL;
            }

            if (!settings.clientId) {
                settings.clientId = DEFAULT_CLIENT_ID;
            }
        },

        applyNewSettings = function (newSettings) {

            settings.wampServerUrl = newSettings.serverAddress;
            settings.clientId = newSettings.workPlaceId;

            localStorageService.set(wampServerLocalStorageKey, settings.wampServerUrl);
            localStorageService.set(clientIdLocalStorageKey, settings.clientId);

        };

    loadFromStorage();

    return {
        makeDefault: setDefaults,
        applyNewSettings: applyNewSettings,
        settings: settings,
        login: DEFAULT_LOGIN,
        password: DEFAULT_PASSWORD
    };
});