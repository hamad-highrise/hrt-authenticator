package com.highrise.verify.alfalah;

import android.os.Build;


import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class MyInfo extends ReactContextBaseJavaModule {

    MyInfo(ReactApplicationContext context) {
        super(context);
    }

    @ReactMethod
    public void getDeviceName(Promise promise) {
        try {
            promise.resolve(Build.MODEL);
        } catch (Exception e) {
            promise.reject("Error:", e);
        }
    }

    @ReactMethod
    public void getDeviceManufacturer(Promise promise) {
        try {
            promise.resolve(Build.MANUFACTURER);
        } catch (Exception e) {
            promise.reject("Error:", e);
        }
    }


    @Override
    public String getName() {
        return "MyInfo";
    }
}
