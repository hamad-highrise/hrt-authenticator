package com.verify.notification;

import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.content.Context;
import android.os.Build;

import com.verify.R;

import static androidx.core.content.ContextCompat.getSystemService;

public class CustomChannel {
    private String CHANNEL_ID;
    private String CHANNEL_DESCRIPTION;
    private int CHANNEL_IMPORTANCE;
    private Context context;

    CustomChannel(Context context) {
        this.CHANNEL_ID = String.valueOf(R.string.default_channel_name);
        this.CHANNEL_DESCRIPTION = String.valueOf(R.string.default_channel_description);
        this.CHANNEL_IMPORTANCE = NotificationManager.IMPORTANCE_DEFAULT;
        this.context = context;
    }

    public void createDefaultNotificationChannel() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            NotificationChannel channel = new NotificationChannel(this.CHANNEL_ID, "DefaultChannel", this.CHANNEL_IMPORTANCE);
            channel.setDescription(this.CHANNEL_DESCRIPTION);
            NotificationManager notificationManager = (NotificationManager) this.context.getSystemService(NotificationManager.class);
            notificationManager.createNotificationChannel(channel);
        }
    }
}
