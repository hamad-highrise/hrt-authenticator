package com.verify.rncipher;

import android.util.Pair;

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
            promise.resolve(result);
        } catch (Exception e) {
            promise.reject("ERROR_ENCRYPTING", e.getMessage());
        }
    }


    @ReactMethod
    public void decrypt(final ReadableMap params, final Promise promise) {
        final String keyAlias = params.getString("keyAlias");
        final String encrypted = params.getString("encrypted");
        final String iv = params.getString("iv");
        try {
            String decrypted = cipher.decrypt(keyAlias, encrypted, iv);
            WritableMap result = new WritableNativeMap();
            result.putString("decrypted", decrypted);
            promise.resolve(result);
        } catch (Exception e) {
            promise.reject("ERROR_DECRYPTING", e.getMessage());
        }
    }

    @NonNull
    @Override
    public String getName() {
        return "RNCipher";
    }
}
