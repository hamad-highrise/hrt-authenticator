package com.highrise.verify;


import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;
import com.highrise.verify.custom.CustomUtilities;
import com.highrise.verify.rnbiometrics.RNBiometrics;
import com.highrise.verify.rncipher.RNCipherModule;
import com.highrise.verify.rnpush.RNPushModule;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class AppPackages implements ReactPackage {
    @Override
    public List<NativeModule> createNativeModules(ReactApplicationContext reactContext) {
        List<NativeModule> modules = new ArrayList<>();
        modules.add(new CustomUtilities(reactContext));
        modules.add(new RNBiometrics(reactContext));
        modules.add(new CustomKeyGen(reactContext));
        modules.add(new RNPushModule(reactContext));
        modules.add(new RNCipherModule(reactContext));
        return modules;
    }

    @Override
    public List<ViewManager> createViewManagers(ReactApplicationContext reactContext) {
        return Collections.emptyList();
    }
}
