package com.highrise.verify;


import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.util.Log;


import com.facebook.react.ReactActivity;

public class MainActivity extends ReactActivity {
    final String TAG = "TEST4";

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
//            deepLinkIntent.setData(uri);
            startActivity(deepLinkIntent);

        }
    }

    @Override
    public void onNewIntent(Intent intent) {
        super.onNewIntent(intent);

    }

    @Override
    protected void onStart() {
        super.onStart();
        Intent i = getIntent();
        final String tenantId = i.getStringExtra("com.ibm.security.access.mmfa.tenant");
        Log.d(TAG, TAG);
        if (tenantId != null) {
            String uriString = BuildConfig.URL_SCHEME + "://transaction/" + tenantId;
            Log.d(TAG, uriString);
            Uri uri = Uri.parse(uriString);
            Intent deepLinkIntent = new Intent(Intent.ACTION_VIEW, uri);
//            deepLinkIntent.setData(uri);
            startActivity(deepLinkIntent);

        }
    }

    @Override
    protected String getMainComponentName() {
        return "verify";
    }
}
