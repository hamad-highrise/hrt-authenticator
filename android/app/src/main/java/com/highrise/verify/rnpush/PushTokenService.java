package com.highrise.verify.rnpush;


import android.content.Intent;
import android.net.Uri;
import android.os.Build;
import android.util.Log;

import androidx.annotation.NonNull;
import androidx.annotation.RequiresApi;

import com.facebook.react.ReactApplication;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.google.firebase.messaging.FirebaseMessagingService;
import com.google.firebase.messaging.RemoteMessage;
import com.highrise.verify.notification.CustomNotifications;

import java.util.Map;
import java.util.Objects;

public class PushTokenService extends FirebaseMessagingService {

    @Override
    public void onMessageReceived(@NonNull RemoteMessage remoteMessage) {
        super.onMessageReceived(remoteMessage);
        CustomNotifications notifications = new CustomNotifications(getApplicationContext());
        sendEvent(String.valueOf(remoteMessage.getData()));
        Intent intent = new Intent(Intent.ACTION_VIEW, Uri.parse("verify://"));
        notifications.createNotification(Objects.requireNonNull(remoteMessage.getNotification()).getTitle(), remoteMessage.getNotification().getBody(), intent);
    }

    private void sendEvent(String body) {
        ReactApplication rnApp = (ReactApplication) getApplicationContext();
//        Log.d("Transaction Notification", body);
        WritableMap params = Arguments.createMap();
        params.putString("data", body);
//        params.putMap("data", (ReadableMap) body);
        rnApp.getReactNativeHost()
                .getReactInstanceManager()
                .getCurrentReactContext()
                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit("transaction", params);
    }

}
