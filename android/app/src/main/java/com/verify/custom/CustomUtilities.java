package com.verify.custom;

import android.content.Context;
import android.content.SharedPreferences;
import android.os.Build;
import android.view.WindowManager;

import androidx.annotation.NonNull;
import androidx.camera.core.CameraInfoUnavailableException;
import androidx.camera.core.CameraX;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.UiThreadUtil;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableNativeMap;
import com.verify.rnbiometrics.RNBiometrics;

import java.io.BufferedReader;
import java.io.File;
import java.io.InputStreamReader;
import java.util.UUID;

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
            deviceInfo.putBoolean("rooted", checkRootMethod1() || checkRootMethod2());
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
    public void isInitiated(Promise promise) {
        try {
            Boolean initiated = this.preferences.getBoolean("initiated", false);
            WritableMap result = new WritableNativeMap();
            result.putBoolean("initiated", initiated);
            promise.resolve(result);
        } catch (Exception e) {
            promise.reject("PREFREADERROR", e.getMessage());
        }
    }

    private boolean checkRootMethod1() {
        String[] paths = {
                "/system/app/Superuser.apk",
                "/sbin/su",
                "/system/bin/su",
                "/system/xbin/su",
                "/data/local/xbin/su",
                "/data/local/bin/su",
                "/system/sd/xbin/su",
                "/system/bin/failsafe/su",
                "/data/local/su"};
        for (String path : paths) {
            if (new File(path).exists()) return true;
        }
        return false;
    }

    private boolean checkRootMethod2() {
        Process process = null;
        try {
            process = Runtime.getRuntime().exec(new String[]{"/system/xbin/which", "su"});
            BufferedReader in = new BufferedReader(new InputStreamReader(process.getInputStream()));
            if (in.readLine() != null) return true;
            return false;
        } catch (Exception e) {
            return false;
        } finally {
            if (process != null) process.destroy();
        }

    }


    private boolean hasFrontCamera() throws CameraInfoUnavailableException {
        boolean hasFrontCamera = CameraX.hasCameraWithLensFacing(CameraX.LensFacing.FRONT);
        return hasFrontCamera;
    }

    @ReactMethod
    public void getUUID(Promise promise) {
        UUID uuid = UUID.randomUUID();
        String uuidString = uuid.toString();
        WritableMap result = new WritableNativeMap();
        result.putString("uuid", uuidString);
        promise.resolve(result);
    }

    @NonNull
    @Override
    public String getName() {
        return "Utilities";
    }
}
