package com.verify.rnpush;


import androidx.annotation.NonNull;

import com.google.firebase.messaging.FirebaseMessagingService;
import com.google.firebase.messaging.RemoteMessage;
import com.verify.notification.CustomNotifications;

public class PushTokenService extends FirebaseMessagingService {

    @Override
    public void onMessageReceived(@NonNull RemoteMessage remoteMessage) {
        super.onMessageReceived(remoteMessage);
        CustomNotifications notifications = new CustomNotifications(getApplicationContext());
        notifications.createNotification(remoteMessage.getNotification().getTitle(), remoteMessage.getNotification().getBody());
    }

}
