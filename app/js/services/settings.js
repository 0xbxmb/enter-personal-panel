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

        settings = {
            wampServerUrl: null,
            clientId: null
        },

        setDefaults = function () {
            settings.wampServerUrl = DEFAULT_WAMP_SERVER_URL;
            settings.clientId = DEFAULT_CLIENT_ID;
        },

        loadFromStorage = function () {

            settings.wampServerUrl = localStorageService.get("wampServerUrl");
            settings.clientId = localStorageService.get("clientId");

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

            localStorageService.set("wampServerUrl", settings.wampServerUrl);
            localStorageService.set("clientId", settings.clientId);

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