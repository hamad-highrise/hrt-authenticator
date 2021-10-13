package com.highrise.verify.notification;

import com.facebook.react.bridge.ReactContext;
import com.facebook.react.modules.core.DeviceEventManagerModule;

import java.util.Map;

public class PushNotificationHandler {
    private ReactContext context;

    public PushNotificationHandler(ReactContext reactContext) {
        this.context = reactContext;
    }


    private void sendEvent(final String eventName, Object params) {
        this.context
                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit(eventName, params);

    }
}
