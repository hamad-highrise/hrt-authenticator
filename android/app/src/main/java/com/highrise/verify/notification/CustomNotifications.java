package com.highrise.verify.notification;


import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.content.Context;
import android.content.Intent;
import android.os.Build;

import androidx.core.app.NotificationCompat;
import androidx.core.app.NotificationManagerCompat;

import com.highrise.verify.MainActivity;
import com.highrise.verify.R;

public class CustomNotifications {
    private static String CHANNEL_ID = "DEFAULT_CHANNEL";
    private final String CHANNEL_NAME = "Default Notification Channel";
    private Context context;
    private String CHANNEL_DESCRIPTION = "For displaying notification";
    private int CHANNEL_IMPORTANCE = NotificationManager.IMPORTANCE_HIGH;

    public CustomNotifications(Context context) {
        this.context = context;
    }


    private void createDefaultNotificationChannel() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            NotificationChannel channel = new NotificationChannel(this.CHANNEL_ID, this.CHANNEL_NAME, this.CHANNEL_IMPORTANCE);
            channel.setDescription(this.CHANNEL_DESCRIPTION);
            channel.enableVibration(true);
            NotificationManager notificationManager = (NotificationManager) this.context.getSystemService(NotificationManager.class);
            notificationManager.createNotificationChannel(channel);
        }
    }


    public void createNotification(final String title, final String text, final Intent linkIntent) {
        createDefaultNotificationChannel();
        Intent intent = new Intent(context, MainActivity.class);
        PendingIntent activityIntent = PendingIntent.getActivity(context, 0, linkIntent, PendingIntent.FLAG_UPDATE_CURRENT);
        NotificationCompat.Builder builder = new NotificationCompat.Builder(this.context, CHANNEL_ID)
                .setContentTitle(title)
                .setContentText(text)
                .setShowWhen(true)
                .setSmallIcon(R.mipmap.ic_launcher_round)
                .setContentIntent(activityIntent)
                .setPriority(NotificationCompat.PRIORITY_DEFAULT)
                .setAutoCancel(true);

        NotificationManagerCompat managerCompat = NotificationManagerCompat.from(context);
        managerCompat.notify(123, builder.build());

    }

}
