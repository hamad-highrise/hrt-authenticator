package com.highrise.verify.rnpush;


import android.content.Intent;
import android.net.Uri;
import android.util.Log;

import androidx.annotation.NonNull;

import com.facebook.react.ReactApplication;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.google.firebase.messaging.FirebaseMessagingService;
import com.google.firebase.messaging.RemoteMessage;
import com.highrise.verify.BuildConfig;
import com.highrise.verify.notification.CustomNotifications;

import java.util.Objects;

public class PushTokenService extends FirebaseMessagingService {

    @Override
    public void onMessageReceived(@NonNull RemoteMessage remoteMessage) {
        super.onMessageReceived(remoteMessage);
        CustomNotifications notifications = new CustomNotifications(getApplicationContext());
        String linkUrl = BuildConfig.URL_SCHEME + "://transaction/" + remoteMessage.getData().get("com.ibm.security.access.mmfa.tenant");
        Log.d("TEST4", linkUrl);
        Intent intent = new Intent(Intent.ACTION_VIEW);
        intent.setData(Uri.parse(linkUrl));
        notifications.createNotification(Objects.requireNonNull(remoteMessage.getNotification()).getTitle(), remoteMessage.getNotification().getBody(), intent);
    }

    private void sendEvent(String body) {
        ReactApplication rnApp = (ReactApplication) getApplicationContext();
        WritableMap params = Arguments.createMap();
        params.putString("data", body);
        rnApp.getReactNativeHost()
                .getReactInstanceManager()
                .getCurrentReactContext()
                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit("transaction", params);
    }

}
