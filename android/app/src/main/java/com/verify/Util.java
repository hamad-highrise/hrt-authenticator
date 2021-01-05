package com.verify;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;

public class Util extends ReactContextBaseJavaModule {
    Util(ReactApplicationContext context){
        super(context);
    }

   

    @Override
    public String getName() {
        return "Util";
    }
}
