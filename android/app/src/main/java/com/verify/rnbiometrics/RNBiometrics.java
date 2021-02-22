package com.verify.rnbiometrics;

import android.os.Build;
import android.security.keystore.KeyGenParameterSpec;
import android.security.keystore.KeyProperties;
import android.util.Base64;

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

import java.security.KeyPair;
import java.security.KeyPairGenerator;
import java.security.KeyStore;
import java.security.PrivateKey;
import java.security.PublicKey;
import java.security.Signature;
import java.security.spec.RSAKeyGenParameterSpec;
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
                WritableMap result = new WritableNativeMap();
                if (canAuthenticate == BiometricManager.BIOMETRIC_SUCCESS) {
                    result.putBoolean("available", true);
                } else {
                    result.putBoolean("available", false);
                    switch (canAuthenticate) {
                        case BiometricManager.BIOMETRIC_ERROR_NO_HARDWARE:
                            result.putString("error", "NO_HARDWARE_FOUND");
                            break;
                        case BiometricManager.BIOMETRIC_ERROR_HW_UNAVAILABLE:
                            result.putString("error", "HARDWARE_DISABLED");
                            break;
                        case BiometricManager.BIOMETRIC_ERROR_NONE_ENROLLED:
                            result.putString("error", "NO_BIOMETRIC_ENROLLED");
                            break;
                    }
                }
                promise.resolve(result);
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
                        String cancelButtonText = params.getString("cancelButtonText");
                        String promptMessage = params.getString("promptMessage");
                        FragmentActivity activity = (FragmentActivity) getCurrentActivity();
                        BiometricPrompt.AuthenticationCallback authCallback = new AuthCallback(promise);
                        Executor executor = Executors.newSingleThreadExecutor();
                        BiometricPrompt prompt = new BiometricPrompt(activity, executor, authCallback);
                        BiometricPrompt.PromptInfo promptInfo = new BiometricPrompt.PromptInfo.Builder()
                                .setDeviceCredentialAllowed(false)
                                .setNegativeButtonText(cancelButtonText)
                                .setTitle(promptMessage)
                                .build();
                        prompt.authenticate(promptInfo);
                    } catch (Exception e) {
                        promise.reject("error", e.getMessage());
                    }
                }
            });
        } else {
            promise.reject("NOT_SUPPORTED", "ANDROID_VERSION_NOT_SUPPORTED");
        }
    }

    @ReactMethod
    public void createBiometricKeys(final String keyAlias, final Promise promise) {
        try {
            if (android.os.Build.VERSION.SDK_INT >= android.os.Build.VERSION_CODES.M) {
                KeyPairGenerator keyPairGenerator = KeyPairGenerator.getInstance(KeyProperties.KEY_ALGORITHM_RSA, "AndroidKeyStore");
                KeyGenParameterSpec spec = new KeyGenParameterSpec.Builder(keyAlias, KeyProperties.PURPOSE_SIGN)
                        .setDigests(KeyProperties.DIGEST_SHA256)
                        .setSignaturePaddings(KeyProperties.SIGNATURE_PADDING_RSA_PKCS1)
                        .setAlgorithmParameterSpec(new RSAKeyGenParameterSpec(2048, RSAKeyGenParameterSpec.F4))
                        .setUserAuthenticationRequired(true)
                        .build();
                keyPairGenerator.initialize(spec);
                KeyPair keyPair = keyPairGenerator.generateKeyPair();
                PublicKey publicKey = keyPair.getPublic();
                byte[] encodedPublicKey = publicKey.getEncoded();
                String publicKeyString = Base64.encodeToString(encodedPublicKey, Base64.DEFAULT);
                publicKeyString = publicKeyString.replace("\r", "").replaceAll("\n", "");
                WritableMap result = new WritableNativeMap();
                result.putString("publicKey", publicKeyString);
                promise.resolve(result);
            } else {
                promise.reject("ERROR", "UNSUPPORTED_VERSION");
            }
        } catch (Exception e) {
            promise.reject("ERROR", "ERROR_GENERATING_KEYS");
        }
    }

    @ReactMethod
    public void deleteKeys(final String keyAlias, final Promise promise) {
        //Check if keys exists
        try {
            KeyStore keyStore = KeyStore.getInstance("AndroidKeyStore");
            keyStore.load(null);
            keyStore.deleteEntry(keyAlias);
            promise.resolve(true);
        } catch (Exception e) {
            promise.reject("DELKEY001", "ERROR_DELETING_KEYS");
        }

    }

    @ReactMethod
    public void signPayload(final ReadableMap options, final Promise promise) {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
            UiThreadUtil.runOnUiThread(
                    new Runnable() {
                        @Override
                        public void run() {
                            try {
                                String promptMessage = options.getString("promptMessage");
                                String cancelButtonText = options.getString("cancelButtonText");
                                String keyAlias = options.getString("keyHandle");
                                String payload = options.getString("payload");
                                Signature signature = Signature.getInstance("SHA256withRSA");
                                KeyStore keyStore = KeyStore.getInstance("AndroidKeyStore");
                                keyStore.load(null);
                                PrivateKey privateKey = (PrivateKey) keyStore.getKey(keyAlias, null);
                                signature.initSign(privateKey);

                                BiometricPrompt.CryptoObject cryptoObject = new BiometricPrompt.CryptoObject(signature);
                                BiometricPrompt.AuthenticationCallback authenticationCallback = new SignatureCallback(promise, payload);
                                Executor executor = Executors.newSingleThreadExecutor();
                                FragmentActivity fragmentActivity = (FragmentActivity) getCurrentActivity();
                                BiometricPrompt biometricPrompt = new BiometricPrompt(fragmentActivity, executor, authenticationCallback);
                                BiometricPrompt.PromptInfo promptInfo = new BiometricPrompt.PromptInfo.Builder()
                                        .setDeviceCredentialAllowed(false)
                                        .setNegativeButtonText(cancelButtonText)
                                        .setTitle(promptMessage)
                                        .build();
                                biometricPrompt.authenticate(promptInfo, cryptoObject);
                            } catch (Exception e) {
                                promise.reject("SIGNPAYLOAD001", "ERROR_SIGNING_PAYLOAD");
                            }
                        }
                    }
            );
        } else {
            promise.reject("UNSUPPORTEDVERSION", "UNSUPPORTED_ANDROID_VERSION");
        }
    }
}


