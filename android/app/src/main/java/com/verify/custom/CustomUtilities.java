package com.verify.custom;

import android.os.Build;
import android.view.WindowManager;


import androidx.annotation.NonNull;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableNativeMap;
import com.facebook.react.bridge.UiThreadUtil;

public class CustomUtilities extends ReactContextBaseJavaModule {
    private final ReactApplicationContext reactContext;

    public CustomUtilities(ReactApplicationContext context) {
        super(context);
        this.reactContext = context;

    }

    @ReactMethod
    public void toggleSecureFlag() {

        UiThreadUtil.runOnUiThread(new Runnable() {
            @Override
            public void run() {

                getCurrentActivity().getWindow().addFlags(WindowManager.LayoutParams.FLAG_SECURE);

            }
        });
    }

    @ReactMethod
    public void getDeviceInfo(Promise promise) {
        try {
            WritableMap deviceInfo = new WritableNativeMap();
            deviceInfo.putString("model", Build.MODEL);
            deviceInfo.putString("brand", Build.BRAND);
            deviceInfo.putString("device", Build.DEVICE);

            promise.resolve(deviceInfo);
        } catch (Exception e) {
            promise.reject("Error:", e);
        }
    }

    @NonNull
    @Override
    public String getName() {
        return "Utilities";
    }
}
