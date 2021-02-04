package com.verify.rnbiometrics;

import android.os.Build;

import androidx.annotation.NonNull;
import androidx.biometric.BiometricManager;
import androidx.biometric.BiometricPrompt;
import androidx.fragment.app.FragmentActivity;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.UiThreadUtil;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableNativeMap;

import java.util.concurrent.Executor;
import java.util.concurrent.Executors;

public class RNBiometrics extends ReactContextBaseJavaModule {

    public RNBiometrics(ReactApplicationContext reactApplicationContext) {
        super(reactApplicationContext);
    }

    @NonNull
    @Override
    public String getName() {
        return "BiometricAndroid";
    }


    @ReactMethod
    public void isSensorAvailable(Promise promise) {
        try {
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
                ReactApplicationContext applicationContext = getReactApplicationContext();
                BiometricManager biometricManager = BiometricManager.from(applicationContext);
                int canAuthenticate = biometricManager.canAuthenticate();
                if (canAuthenticate == BiometricManager.BIOMETRIC_SUCCESS) {
                    WritableMap result = new WritableNativeMap();
                    result.putBoolean("available", true);
                    promise.resolve(result);
                } else {
                    WritableMap result = new WritableNativeMap();
                    switch (canAuthenticate) {
                        case BiometricManager.BIOMETRIC_ERROR_NO_HARDWARE:
                            result.putString("error", "NO_HARDWARE_FOUND");
                            break;
                        case BiometricManager.BIOMETRIC_ERROR_HW_UNAVAILABLE:
                            result.putString("error", "HARDWARE_DISABLED");
                            break;
                        case BiometricManager.BIOMETRIC_ERROR_NONE_ENROLLED:
                            result.putString("error", "NO_CREDS_ENROLLED");
                            break;
                    }
                    promise.resolve(result);
                }
            } else {
                promise.reject("Error", "Unsupported Android Version");
            }

        } catch (Exception e) {
            promise.reject("Error", e.getMessage());
        }
    }

    @ReactMethod
    public void showSimpleBiometricPrompt(final ReadableMap params, final Promise promise) {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
            UiThreadUtil.runOnUiThread(new Runnable() {
                @Override
                public void run() {
                    try {
                        // String cancelButtonText = params.getString("cancelButtonText");
                        // String promptMessage = params.getString("promptMessage");
                        // FragmentActivity activity = (FragmentActivity) getCurrentActivity();
                        // BiometricPrompt.AuthenticationCallback authCallback = new AuthCallback(promise);
                        // Executor executor = Executors.newSingleThreadExecutor();
                        // BiometricPrompt prompt = new BiometricPrompt(activity, executor, authCallback);
                        // BiometricPrompt.PromptInfo promptInfo = new BiometricPrompt.PromptInfo.Builder()
                        //         .setDeviceCredentialAllowed(false)
                        //         .setNegativeButtonText(cancelButtonText)
                        //         .setTitle(promptMessage)
                        //         .build();
                        // prompt.authenticate(promptInfo);
                    } catch (Exception e) {
                        promise.reject("error", e.getMessage());
                    }
                }
            });
        } else {
            promise.reject("NOT_SUPPORTED", "ANDROID_VERSION_NOT_SUPPORTED");
        }
    }
}
