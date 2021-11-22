package com.highrise.verify;


import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.os.Handler;
import android.util.Log;


import com.facebook.react.ReactActivity;
import com.facebook.react.ReactApplication;
import com.facebook.react.modules.core.DeviceEventManagerModule;

public class MainActivity extends ReactActivity {
    final String TAG = "TEST4";
    Uri link = null;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(null);
        Intent i = getIntent();
        final String tenantId = i.getStringExtra("com.ibm.security.access.mmfa.tenant");
        Log.d(TAG, TAG);
        if (tenantId != null) {

            String uriString = BuildConfig.URL_SCHEME + "://transaction/" + tenantId;
            Log.d(TAG, uriString);
            Uri uri = Uri.parse(uriString);
            Intent deepLinkIntent = new Intent(Intent.ACTION_VIEW, uri);

            new Handler().postDelayed(new Runnable() {
                @Override
                public void run() {
                    startActivity(deepLinkIntent);
                }
            }, 3000);
        }
    }

    @Override
    protected void onResume() {
        super.onResume();
        Intent i = getIntent();
        final String tenantId = i.getStringExtra("com.ibm.security.access.mmfa.tenant");
        Log.d(TAG + "5", TAG);
        if (tenantId != null) {

            String uriString = BuildConfig.URL_SCHEME + "://transaction/" + tenantId;
            Log.d(TAG + "5", uriString);
            Uri uri = Uri.parse(uriString);
            Intent deepLinkIntent = new Intent(Intent.ACTION_VIEW, uri);

            new Handler().postDelayed(new Runnable() {
                @Override
                public void run() {
                    startActivity(deepLinkIntent);
                }
            }, 3000);
        }
    }

    @Override
    public void onNewIntent(Intent intent) {
        super.onNewIntent(intent);
        setIntent(intent);
    }

    @Override
    protected String getMainComponentName() {
        return "verify";
    }
}
