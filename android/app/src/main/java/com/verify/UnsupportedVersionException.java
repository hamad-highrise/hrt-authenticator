package com.highrise.verify;

public class UnsupportedVersionException extends Exception {

    public UnsupportedVersionException() {
        super("UNSUPPORTED_ANDROID_VERSION");
    }
}
