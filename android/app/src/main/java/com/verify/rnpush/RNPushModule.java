package com.highrise.verify.alfalah.rnpush;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableNativeMap;
import com.google.android.gms.tasks.OnCompleteListener;
import com.google.android.gms.tasks.Task;
import com.google.firebase.messaging.FirebaseMessaging;

public class RNPushModule extends ReactContextBaseJavaModule {

    public RNPushModule(ReactApplicationContext reactApplicationContext) {
        super(reactApplicationContext);
    }

    @ReactMethod
    public void getFirebaseToken(Promise promise) {
        FirebaseMessaging.getInstance().getToken().addOnCompleteListener(new OnCompleteListener<String>() {
            @Override
            public void onComplete(@NonNull Task<String> task) {
                if (!task.isSuccessful()) {
                    promise.reject("TOKEN_ERROR", task.getException());
                    return;
                }
                WritableMap result = new WritableNativeMap();
                result.putString("pushToken", task.getResult());
                promise.resolve(result);
            }
        });
    }

    @NonNull
    @Override
    public String getName() {
        return "RNPush";
    }
}
