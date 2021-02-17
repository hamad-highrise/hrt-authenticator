package com.verify.custom;

import android.content.Context;
import android.content.SharedPreferences;
import android.hardware.Camera;
import android.os.Build;
import android.view.WindowManager;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.UiThreadUtil;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableNativeMap;
import com.verify.rnbiometrics.RNBiometrics;

public class CustomUtilities extends ReactContextBaseJavaModule {
    private final ReactApplicationContext reactContext;
    private final RNBiometrics biometrics;
    private final SharedPreferences preferences;
    private final String prefName = "settingsPref";

    public CustomUtilities(ReactApplicationContext context) {
        super(context);
        this.reactContext = context;
        this.biometrics = new RNBiometrics(context);
        this.preferences = context.getSharedPreferences(prefName, Context.MODE_PRIVATE);
    }

    @ReactMethod
    public void addSecureFlag() {

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
            deviceInfo.putString("device", Build.PRODUCT);
            deviceInfo.putString("osVersion", Build.VERSION.RELEASE);
            deviceInfo.putBoolean("frontCamera", hasFrontCamera());
            promise.resolve(deviceInfo);
        } catch (Exception e) {
            promise.reject("DEVICEINFOERROR", e.getMessage());
        }
    }

    @ReactMethod
    public void setInitiated(Promise promise) {
        try {
            SharedPreferences.Editor editor = this.preferences.edit();
            editor.putBoolean("initiated", true);
            editor.apply();
            promise.resolve(true);
        } catch (Exception e) {
            promise.reject("PREFERROR", e.getMessage());
        }

    }

    @ReactMethod
    private void isInitialStart(Promise promise) {
        try {
            Boolean initiated = this.preferences.getBoolean("initiated", false);
            WritableMap result = new WritableNativeMap();
            result.putBoolean("initiated", initiated);
            promise.resolve(result);
        } catch (Exception e) {
            promise.reject("PREFREADERROR", e.getMessage());
        }
    }


    private boolean hasFrontCamera() {
        Camera.CameraInfo cameraInfo = new Camera.CameraInfo();
        int numberOfCameras = Camera.getNumberOfCameras();
        for (int i = 0; i < numberOfCameras; i++) {
            Camera.getCameraInfo(i, cameraInfo);
            if (cameraInfo.facing == Camera.CameraInfo.CAMERA_FACING_FRONT) {
                return true;
            }
        }
        return false;
    }

    @NonNull
    @Override
    public String getName() {
        return "Utilities";
    }
}
