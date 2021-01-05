package com.verify;

import android.os.Build;
import androidx.annotation.NonNull;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class DeviceInfo extends ReactContextBaseJavaModule {

    DeviceInfo(ReactApplicationContext context) {
        super(context);
    }

    @ReactMethod
    public String getDeviceName() {
        return Build.MODEL;
    }

    @ReactMethod
    public void getDeviceManufacturer(Promise promise) {
        try {
            promise.resolve(Build.MANUFACTURER);
        } catch (Exception e) {
            promise.reject("Error:", e);
        }
    }


    @NonNull
    @Override
    public String getName() {
        return "DeviceInfo";
    }
}
