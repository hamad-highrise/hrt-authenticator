package com.verify.notification;


import android.content.Context;

import androidx.core.app.NotificationCompat;

import com.facebook.react.bridge.ReactApplicationContext;
import com.verify.R;

public class CustomNotifications {
    private ReactApplicationContext context;

    CustomNotifications(ReactApplicationContext context) {
        this.context = context;
    }


    private void createNotification() {
        NotificationCompat.Builder builder = new NotificationCompat.Builder(this.context, String.valueOf(R.string.default_channel_name))
                .setContentTitle("Test Notification")
                .setContentText("This is a placeholder.")
                .setPriority(NotificationCompat.PRIORITY_DEFAULT)
                .setAutoCancel(true);
    }
}
