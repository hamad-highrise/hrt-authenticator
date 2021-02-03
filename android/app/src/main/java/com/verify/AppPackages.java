package com.verify;


import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;
import com.verify.custom.CustomUtilities;
import com.verify.rnbiometrics.RNBiometrics;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class AppPackages implements ReactPackage {
    @Override
    public List<NativeModule> createNativeModules(ReactApplicationContext reactContext) {
        List<NativeModule> modules = new ArrayList<>();
        modules.add(new CustomUtilities(reactContext));
//        modules.add(new SecureModule(reactContext));
        modules.add(new RNBiometrics(reactContext));
        modules.add(new CustomKeyGen(reactContext));
        return modules;
    }

    @Override
    public List<ViewManager> createViewManagers(ReactApplicationContext reactContext) {
        return Collections.emptyList();
    }
}
