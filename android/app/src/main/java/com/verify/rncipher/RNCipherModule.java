package com.verify.rncipher;

import android.util.Log;
import android.util.Pair;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableNativeMap;

import java.nio.charset.StandardCharsets;

public class RNCipherModule extends ReactContextBaseJavaModule {

    final RNCipher cipher;
    final String TAG = "CIPHER_REACT";

    public RNCipherModule(ReactApplicationContext reactApplicationContext) {
        super(reactApplicationContext);
        this.cipher = new RNCipher();
    }


    @ReactMethod
    public void encrypt(final ReadableMap params, final Promise promise) {
        final String keyAlias = params.getString("keyAlias");
        final String payload = params.getString("payload");
        try {
            Pair pair = cipher.encrypt(keyAlias, payload);
            WritableMap result = new WritableNativeMap();
            result.putString("encrypted", (String) pair.first);
            result.putString("iv", (String) pair.second);
            Log.d(TAG, String.valueOf(((String) pair.second).getBytes(StandardCharsets.UTF_8).length));
            promise.resolve(result);
        } catch (Exception e) {
            Log.d(TAG, String.valueOf(e));
            promise.reject("ERROR_ENCRYPTING", e.getMessage());
        }
    }


    @ReactMethod
    public void decrypt(final ReadableMap params, final Promise promise) {
        final String keyAlias = params.getString("keyAlias");
        final String encrypted = params.getString("encrypted");
        final String iv = params.getString("iv");
        try {
            Log.d(TAG, String.valueOf(iv.getBytes(StandardCharsets.UTF_8).length));
            String decrypted = cipher.decrypt(keyAlias, encrypted, iv);
            WritableMap result = new WritableNativeMap();
            result.putString("decrypted", decrypted);
            Log.d("DECRYPT", "SUCCESS");
            promise.resolve(result);
        } catch (Exception e) {

            Log.d(TAG, String.valueOf(e));
            promise.reject("ERROR_DECRYPTING", e.getMessage());
        }
    }

    @NonNull
    @Override
    public String getName() {
        return "RNCipher";
    }
}
