package com.verify.secure;

import android.util.Pair;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableNativeMap;

public class SecureModule extends ReactContextBaseJavaModule {
    private EnCryptor enCryptor;
    private DeCryptor deCryptor;

    public SecureModule(ReactApplicationContext context) {
        super(context);
        this.enCryptor = new EnCryptor();
        this.deCryptor = new DeCryptor();
    }

    @NonNull
    @Override
    public String getName() {
        return "CustomCipher";
    }

    @ReactMethod
    void encrypt(final String alias, final String data, Promise promise) {
        try {
            Pair encryption = enCryptor.encrypt(alias, data);
            WritableMap result = new WritableNativeMap();

            result.putString("encryptedText", (String) encryption.first);
            result.putString("iv", (String) encryption.second);
            promise.resolve(result);
        } catch (Exception e) {
            promise.reject(e);
        }
    }

    @ReactMethod
    void decrypt(final String alias, final String encryptedData, final String iv, Promise promise) {
        try {
            String decrypted = deCryptor.decrypt(alias, encryptedData.getBytes("UTF-8"), iv.getBytes("UTF-8"));
            promise.resolve(decrypted);
        } catch (Exception e) {
            promise.reject(e);
        }
    }
}
