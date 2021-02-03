package com.verify;

import android.security.keystore.KeyGenParameterSpec;
import android.security.keystore.KeyProperties;
import android.util.Base64;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableNativeMap;

import java.security.KeyPair;
import java.security.KeyPairGenerator;
import java.security.PublicKey;
import java.security.spec.RSAKeyGenParameterSpec;

public class CustomKeyGen extends ReactContextBaseJavaModule {

    public CustomKeyGen(ReactApplicationContext reactApplicationContext) {
        super(reactApplicationContext);
    }

    @ReactMethod
    public void createKeys(final String keyAlias, Promise promise) {
        try {
            if (android.os.Build.VERSION.SDK_INT >= android.os.Build.VERSION_CODES.M) {
                KeyPairGenerator pairGenerator = KeyPairGenerator.getInstance(KeyProperties.KEY_ALGORITHM_RSA, "AndroidKeyStore");

                KeyGenParameterSpec spec = new KeyGenParameterSpec.Builder(keyAlias, KeyProperties.PURPOSE_SIGN)
                        .setDigests(KeyProperties.DIGEST_SHA256)
                        .setSignaturePaddings(KeyProperties.SIGNATURE_PADDING_RSA_PKCS1)
                        .setAlgorithmParameterSpec(new RSAKeyGenParameterSpec(2048, RSAKeyGenParameterSpec.F4))
                        .setUserAuthenticationRequired(false)
                        .build();
                pairGenerator.initialize(spec);
                KeyPair keyPair = pairGenerator.generateKeyPair();
                PublicKey publicKey = keyPair.getPublic();
                byte[] encodedPublicKey = publicKey.getEncoded();
                String publicKeyString = Base64.encodeToString(encodedPublicKey, Base64.DEFAULT);
                WritableMap resultMap = new WritableNativeMap();
                resultMap.putString("publicKey", publicKeyString);
                promise.resolve(resultMap);
            } else {
                promise.reject("Error", "Unsupported Android Versio");
            }
        } catch (Exception e) {
            promise.reject("Error", e.getMessage());
        }
    }


    @NonNull
    @Override
    public String getName() {
        return "CustomKeyGen";
    }
}
