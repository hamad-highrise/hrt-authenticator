package com.verify.rncipher;

import android.util.Log;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableNativeMap;

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
            String cipherText = cipher.encrypt(keyAlias, payload);
            WritableMap result = new WritableNativeMap();
            result.putString("cipherText", cipherText);
            promise.resolve(result);
        } catch (Exception e) {
            Log.d(TAG, String.valueOf(e));
            promise.reject("ERROR_ENCRYPTING", e.getMessage());
        }
    }


    @ReactMethod
    public void decrypt(final ReadableMap params, final Promise promise) {
        final String keyAlias = params.getString("keyAlias");
        final String cipherText = params.getString("cipherText");

        try {

            String decrypted = cipher.decrypt(keyAlias, cipherText);
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
